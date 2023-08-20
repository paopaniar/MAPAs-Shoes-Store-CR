

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const orden= await prisma.orden.findMany({
        orderBy: {
            fechaOrden: 'asc',
          },
        include: {
            usuario: true,
            metodoPago:true,
            direccion:true,
            ordenProductos: {
              include: {
                  producto:{
                    include:{
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
    let idorden=parseInt(request.params.id);
    const ordenes=await prisma.orden.findUnique({
        where: {id: idorden},
     include:{
        usuario:true,
        metodoPago:true,
        direccion:true,
        ordenProductos: {
            include: {
                producto:{
                  include:{
                    usuario: true,
                  },
                },
            },
          },
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
            usuarioId: id
          }
        }
      }
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
                  segundoApellido: true
                }
              }
            }
          }
        }
      }
    }
  });
  response.json(ordenes);
};

module.exports.getByClient = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const ordenes = await prisma.orden.findMany({
    where: {usuarioId: id },
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
                  segundoApellido: true
                }
              }
            }
          }
          
        }
      }
    }
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
  let infoOrden=request.body;

  const newProducto =await prisma.orden.create({
    data:{
      fechaOrden:infoOrden.fechaOrden,
      usuarioId: infoOrden.usuarioId,
      metodoPagoId:infoOrden.metodoPagoId,
      direccionId:infoOrden.direccionId,
      ordenProductos:{
        createMany:{
          data: infoOrden.ordenProductos
        }
      }
  }
  });
  for (const detalle of infoOrden.ordenProductos) {
    const product = await prisma.producto.findUnique({
      where: { id: detalle.productoId }
    });

    if (product) {
      const updatedQuantity = product.cantidadDisponible - detalle.cantidad;

      await prisma.producto.update({
        where: { id: detalle.productoId },
        data: { cantidadDisponible: updatedQuantity }
      });
    }
  }
  response.json(newProducto)
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
  let dia = parseInt(request.params.dia ); 
  const result= await prisma.$queryRaw(
    Prisma.sql`SELECT o.id, SUM(od.cantidad) as 
   suma FROM orden o, ordendetalle od, producto p
   WHERE o.id=od.id and od.productoId=p.id 
   AND DATE(o.fechaOrden) = DATE_ADD(CURRENT_DATE, INTERVAL ${dia - 1} DAY) GROUP BY od.productoId`
  )
  //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
  response.json(result)
};

