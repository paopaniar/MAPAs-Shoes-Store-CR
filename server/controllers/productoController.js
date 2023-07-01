//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const producto= await prisma.producto.findMany(); 
    response.json(producto); // este response es como un return
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idProd=parseInt(request.params.id);
    const productos=await prisma.usuario.findUnique({
        where: {id: idProd}
    })
    response.json(productos);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};




