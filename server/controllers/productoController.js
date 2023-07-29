//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado

module.exports.get = async (request, response, next) => {
    const producto= await prisma.producto.findMany({
    include: {
        usuario: true,
        fotografias:true,
        categorias:true,
      },
      
    }); 
    response.json(producto); // este response es como un return
};
/*
module.exports.get = async (request, response, next) => {
  const consultaProductos= await prisma.consultaProductos.findMany(); 
  response.json(consultaProductos); // este response es como un return
};*/

//Obtener por Id
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

//este otro es nuevo, pero igual no funciona
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
        connect: producto.categorias,
      },
        },
  });
  response.json(newProducto);
};

// module.exports.update = async (request, response, next) => {
//   let videojuego = request.body;
//   let idVideojuego = parseInt(request.params.id);
//   //Obtener videojuego viejo
//   const videojuegoViejo = await prisma.videojuego.findUnique({
//     where: { id: idVideojuego },
//     include: {
//       generos: {
//         select:{
//           id:true
//         }
//       }
//     }
//   });

//   const newVideojuego = await prisma.videojuego.update({
//     where: {
//       id: idVideojuego,
//     },
//     data: {
//       nombre: videojuego.nombre,
//       descripcion: videojuego.descripcion,
//       precio: videojuego.precio,
//       publicar: videojuego.publicar,
//       generos: {
//         //Generos tiene que ser {id:valor}
//         disconnect:videojuegoViejo.generos,
//         connect: videojuego.generos,
//       },
//     },
//   });
//   response.json(newVideojuego);




