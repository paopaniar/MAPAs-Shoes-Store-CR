const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const preguntas= await prisma.consultaProductos.findMany({
    include: {
        
        mensaje : true,
        respuesta : true, 
        producto  : true,
        usuario   : true,
      },

    }); 
    response.json(preguntas);
};

module.exports.getByPregunta = async (request, response, next) => {
    let idPregunta=parseInt(request.params.id);
    const preguntas= await prisma.consultaProductos.findMany({
        where: {id: idPregunta},
        include: {
            mensaje : true,
            respuesta : true, 
            producto  : true,
            usuario   : true,
      },
    });
    response.json(productos);
};