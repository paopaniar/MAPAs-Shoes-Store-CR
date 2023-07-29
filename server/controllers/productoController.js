const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const producto= await prisma.producto.findMany({
    include: {
        usuario: true,
        fotografias:true,
        categorias:true,
      },
      
    }); 
    response.json(producto);
};

module.exports.getById = async (request, response, next) => {
    let idProd=parseInt(request.params.id);
    const productos=await prisma.producto.findUnique({
        where: {id: idProd},
     include:{
        usuario:true,
        categorias:true,
        consultaProductos:
        {
          select: {
            id:true,
            mensaje: true,
            respuesta: true,
            usuario:true,
        },
        },
        fotografias: true,
     },
    });
    response.json(productos);
};

  module.exports.getByClient = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const productos=await prisma.producto.findMany({
        where: {usuarioId: id},
        include: {
          usuario:true,
          categoria: {
            select: {
              id: true,
              nombreCategoria: true,
          },
          },
        consultaProductos:{
          include:{
              usuario:true,
          },
      },
     },
    });
    response.json(productos);
};


module.exports.create = async (request, response, next) => {
  let producto = request.body;
  const newProducto = await prisma.producto.create({
    data: {
      nombreProducto: producto.nombreProducto,
      precio: producto.precio, 
      proveedor: producto.proveedor, 
      descripcion: producto.descripcion,
      cantidadDisponible:parseInt(producto.cantidadDisponible),
      usuarioId:3,
      categorias: {
        connect: producto.categorias.map((categoryId) => ({ id: categoryId })),
      },
        },
  });
  response.json(newProducto);
};

module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idproducto = parseInt(request.params.id);
  //Obtener videojuego viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idproducto },
    include: {
      categorias: {
        select:{
          id:true
        }
      }
    }
  });

  const newroducto = await prisma.producto.update({
    where: {
      id: idproducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      publicar: producto.publicar,
      categorias: {
        disconnect:productoViejo.categorias,
        connect: producto.categorias,
      },
    },
  });
  response.json(newVideojuego);

}


