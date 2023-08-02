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
          categorias: true,
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

  const newProducto = await prisma.producto.update({
    where: {
      id: idproducto,
    },
    data: {
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidadDisponible: producto.cantidadDisponible,
     
      categorias: {
        disconnect:productoViejo.categorias,
        connect: producto.categorias,
      },
    },
  });
  response.json(newProducto);
};

module.exports.createQuestion = async (request, response, next) => {
  try {
    let { mensaje } = request.body;
    let { respuesta } = request.body;
    let idproducto = parseInt(request.params.id);

    // Insert the  new question into the database
    const newPregunta = await prisma.consultaProductos.create({
      data: {
        mensaje: mensaje,
        respuesta: respuesta,
        productoId: idproducto,
        usuarioId: 1, // Replace 1 with the actual user ID from the request or your authentication mechanism
      },
    });

    response.json(newPregunta);
  } catch (error) {
    console.error('Error creating question:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};


