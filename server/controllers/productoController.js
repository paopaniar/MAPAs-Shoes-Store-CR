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
        fotografias: true,
      },
      
    }); 
    response.json(producto); // este response es como un return
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idProd=parseInt(request.params.id);
    const productos=await prisma.producto.findUnique({
        where: {id: idProd},
     include:{
        usuario:true,
        categoria:true,
     },
    });
    response.json(productos);
};

module.exports.getByVendedor = async (request, response, next) => {
    const idProd = parseInt(request.params.id);
    const userId = parseInt(request.params.userId); // Assuming you have the user ID as a request parameter
    
    const producto = await prisma.producto.findUnique({
      where: { id: idProd },
      include: {
        usuario: {
          where: { id: 3 }, 
        },
        categoria: true,
      },
    });
  
    response.json(producto);
  };
  
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};




