//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const usuario= await prisma.usuario.findMany(); //NOTAS: esto es como un select de usuarios
    response.json(usuario); // este response es como un return
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idUser=parseInt(request.params.id);
    const usuarios=await prisma.usuario.findUnique({
        where: {id: idUser}
    })
    response.json(usuarios);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};



//VER ESTOS EJEMPLOS PARA GUIARSE, VISTOS EN CLASE 

//Ejemplo de la profe para el select 
/*module.exports.get = async (request, response, next) => {
    const videojuegos= await prisma.videojuego.findMany({
        orderBy:{
            nombre: 'asc',

        },
         select: {
            id: true,
            nombre: true
        },
    });
    response.json(videojuegos);
};
//Ejemplo de la profe para Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const videojuego=await prisma.videojuego.findUnique({
        where: {id: id},
        include:{
            generos:true
            
        }

    })
    response.json(videojuego);

};*/

