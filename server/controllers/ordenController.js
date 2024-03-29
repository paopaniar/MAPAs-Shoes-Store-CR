const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const orden = await prisma.orden.findMany({
    orderBy: {
      fechaOrden: "asc",
    },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        include: {
          producto: {
            include: {
              usuario: true,
            },
          },
        },
      },
    },
  });
  response.json(orden);
};

module.exports.getById = async (request, response, next) => {
  let idorden = parseInt(request.params.id);
  const ordenes = await prisma.orden.findUnique({
    where: { id: idorden },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        include: {
          producto: {
            include: {
              usuario: true,
            },
          },
        },
      },
      evaluaciones: true,
    },
  });
  response.json(ordenes);
};

module.exports.getByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const ordenes = await prisma.orden.findMany({
    where: {
      ordenProductos: {
        every: {
          producto: {
            usuarioId: id,
          },
        },
      },
    },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        select: {
          id: true,
          cantidad: true,
          iva: true,
          subtotal: true,
          total: true,
          ordenId: true,
          producto: {
            select: {
              nombreProducto: true,
              precio: true,
              descripcion: true,
              usuario: {
                select: {
                  nombre: true,
                  primerApellido: true,
                  segundoApellido: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(ordenes);
};

module.exports.getByClient = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const ordenes = await prisma.orden.findMany({
    where: { usuarioId: id },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        select: {
          id: true,
          cantidad: true,
          iva: true,
          subtotal: true,
          total: true,
          ordenId: true,
          producto: {
            select: {
              nombreProducto: true,
              precio: true,
              descripcion: true,
              usuario: {
                select: {
                  nombre: true,
                  primerApellido: true,
                  segundoApellido: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(ordenes);
};
module.exports.getByClientbyFinalizadas = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const estado = parseInt(request.params.estado);
  const ordenes = await prisma.orden.findMany({
    where: { usuarioId: id, estado: estado },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        select: {
          id: true,
          cantidad: true,
          iva: true,
          subtotal: true,
          total: true,
          ordenId: true,
          producto: {
            select: {
              nombreProducto: true,
              precio: true,
              descripcion: true,
              usuario: {
                select: {
                  nombre: true,
                  primerApellido: true,
                  segundoApellido: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(ordenes);
};

module.exports.create = async (request, response, next) => {
  let infoOrden = request.body;

  const newProducto = await prisma.orden.create({
    data: {
      fechaOrden: infoOrden.fechaOrden,
      usuarioId: infoOrden.usuarioId,
      metodoPagoId: infoOrden.metodoPagoId,
      direccionId: infoOrden.direccionId,
      ordenProductos: {
        createMany: {
          data: infoOrden.ordenProductos,
        },
      },
    },
  });
  for (const detalle of infoOrden.ordenProductos) {
    const product = await prisma.producto.findUnique({
      where: { id: detalle.productoId },
    });

    if (product) {
      const updatedQuantity = product.cantidadDisponible - detalle.cantidad;

      await prisma.producto.update({
        where: { id: detalle.productoId },
        data: { cantidadDisponible: updatedQuantity },
      });
    }
  }
  response.json(newProducto);
};
module.exports.update = async (request, response, next) => {
  let idOrden = parseInt(request.params.id); // Corrected variable name
  const ordenActual = await prisma.orden.findUnique({
    where: { id: idOrden },
  });
  try {
    const estadoUpdated = await prisma.orden.update({
      where: { id: idOrden }, // Corrected variable name
      data: { estado: ordenActual.estado ? 0 : 1 }, // Flip the value of estado
    });
    response.json(estadoUpdated);
  } catch (error) {
    next(error);
  }
};
module.exports.getCantidadCompras = async (request, response, next) => {
  const hoy = new Date();
  hoy.setUTCHours(0, 0, 0, 0); // Set UTC time to the start of the day
  const mannana = new Date(hoy);
  mannana.setUTCDate(mannana.getUTCDate() + 1); // Get the start of the next UTC day
  const pedidosHoy = await prisma.orden.findMany({
    where: {
      fechaOrden: {
        gte: hoy.toISOString(),
        lt: mannana.toISOString(),
      },
    },
  });
  response.json(pedidosHoy);
};

module.exports.getVentaProductoTop5 = async (request, response, next) => {
  let numeroMes = parseInt(request.params.numeroMes);
  const result = await prisma.$queryRaw(
    Prisma.sql`
    SELECT p.nombreProducto, SUM(od.cantidad) as suma 
    FROM orden o
    INNER JOIN ordenDetalle od ON o.id = od.ordenId
    INNER JOIN producto p ON od.productoId = p.id
    WHERE MONTH(o.fechaOrden) = ${numeroMes} 
    GROUP BY p.id 
    ORDER BY suma DESC 
    LIMIT 5`
  );
  console.log(result);
  response.json(result);
};

module.exports.getMejoresVendedores = async (request, response, next) => {
  //let mes = parseInt(request.params.mes);
  const result = await prisma.$queryRaw(
    Prisma.sql`
    SELECT u.id, u.nombre, ru.* 
FROM mapas.usuario u 
INNER JOIN mapas.orden o ON u.id = o.usuarioId 
INNER JOIN mapas.evaluacion e ON o.id = e.ordenId 
INNER JOIN mapas._roltousuario ru ON u.id = ru.B 
WHERE ru.A = 3`
  );
  response.json(result);
};

module.exports.getPeoresVendedores = async (request, response, next) => {
  //let mes = parseInt(request.params.mes);
  const result = await prisma.$queryRaw(
    Prisma.sql`
    SELECT u.id, u.nombre, u.primerApellido, u.segundoApellido, AVG(e.calificacionFinal) as promedio
    FROM usuario u
    INNER JOIN orden o ON u.id = o.usuarioId
    INNER JOIN evaluacion e ON o.id = e.ordenId
    WHERE u.roles LIKE '%Vendedor%'
    GROUP BY u.id, u.nombre, u.primerApellido, u.segundoApellido
    ORDER BY promedio ASC
    LIMIT 3;`
  );

  response.json(result);
};
module.exports.getProductoMasVendidoVendedor = async (
  request,
  response,
  next
) => {
  const vendedorId = request.params.id; // Id del vendedor logueado
  const result = await prisma.$queryRaw(
    Prisma.sql`
      SELECT p.nombreProducto, SUM(od.cantidad) AS totalVentas
      FROM producto p
      INNER JOIN ordendetalle od ON p.id = od.productoId
      INNER JOIN orden o ON od.ordenId = o.id
      WHERE p.usuarioId = ${vendedorId}
      GROUP BY p.id, p.nombreProducto
      ORDER BY totalVentas ASC
      LIMIT 1;`
  );
  response.json(result);
};
module.exports.getClienteConMasCompras = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`
      SELECT u.nombre, u.primerApellido, u.segundoApellido, COUNT(o.id) AS totalCompras, SUM(od.cantidad) AS totalProductosComprados
      FROM usuario u
      INNER JOIN orden o ON u.id = o.usuarioId
      INNER JOIN ordendetalle od ON o.id = od.ordenId
      GROUP BY u.id
      ORDER BY totalCompras DESC, totalProductosComprados DESC
      LIMIT 1;`
  );
console.log(result);
  response.json(result);
};
module.exports.getCantidadEvaluacionesPorEscala = async (
  request,
  response,
  next
) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`
      SELECT calificacionFinal, COUNT(*) AS cantidad
      FROM evaluacion
      GROUP BY calificacionFinal;`
  );

  response.json(result);
};
