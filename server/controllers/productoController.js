const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require("../middleware/multerConfig");

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
  let idProd = parseInt(request.params.id);
  const productos = await prisma.producto.findUnique({
    where: { id: idProd },
    include: {
      usuario: true,
      categorias: true,
      consultaProductos: {
        select: {
          id: true,
          mensaje: true,
          respuesta: true,
          usuario: true,
          respuestas: {
            select: {
              id: true,
              respuesta: true,
            },
          },
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
  // const imagenes = request.files;
  const newProducto = await prisma.producto.create({
    data: { 
      nombreProducto: producto.nombreProducto,
      precio: producto.precio, 
      proveedor: producto.proveedor, 
      descripcion: producto.descripcion,
      cantidadDisponible:parseInt(producto.cantidadDisponible),
      usuarioId: parseInt(producto.usuario),
      categorias: { 
        connect: producto.categorias.map((categoryId) => ({ id: categoryId })),
      },
        }, 
  });
   
    // if (imagenes && imagenes.length > 0) {
    //   const imagenesData = imagenes.map((imagen) => ({
    //     imagen: "http://localhost:3000/" + imagen.destination + "/" + imagen.filename,
    //     productoId: newProducto.id,
    //   }));
    //   await prisma.fotografia.createMany({
    //     data: imagenesData,
    //   });
    // }

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
    let { usuarioId } = request.body;
    let idproducto = parseInt(request.params.id);
    const newPregunta = await prisma.consultaProductos.create({
      data: {
        mensaje: mensaje,
        respuesta: respuesta,
        productoId: idproducto,
        usuarioId: usuarioId,
      },
    });

    response.json(newPregunta);
  } catch (error) {
    console.error('Error creating question:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.createAnswer = async (request, response, next) => {
  try {
    let { respuesta } = request.body;
    let idPreguntas = parseInt(request.params.id);

    // Insert the  new question into the database
    const newRespusta = await prisma.respuesta.create({
      data: {
        respuesta: respuesta,
        idPregunta: idPreguntas,
      },
    });

    response.json(newRespusta);
  } catch (error) {
    console.error('Error creating question:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

  
module.exports.updateConsulta = async (request, response, next) => {
  let consultaProductos = request.body;
  let idConsultaProducto = parseInt(request.params.consultaProductos.id);
  //Obtener videojuego viejo
  const consulta = await prisma.consultaProductos.findUnique({
    where: { id: idConsultaProducto },
    include: { 
      usuario:true,
      producto:true
    }
  });

  const newProducto = await prisma.consultaProductos.update({
    where: {
      id: idConsultaProducto,
    },
    data: {
      mensaje: consultaProductos.mensaje,
      respuesta: consultaProductos.respuesta,
    },
  });
  response.json(newProducto);
};


