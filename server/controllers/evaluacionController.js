const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const evaluacion= await prisma.evaluacion.findMany({
    include: {
        usuario: true,
        orden:true,
      },
      
    }); 
    response.json(evaluacion);
};

module.exports.getById = async (request, response, next) => {
  let idEvaluacion = parseInt(request.params.id);
  const evaluaciones = await prisma.evaluacion.findUnique({
    where: { id: idEvaluacion },
    include: {
      usuario: true,
      orden:true,
    }
  });
  response.json(productos);
};

module.exports.create = async (request, response, next) => {
    let evaluacion = request.body;

    const newProducto = await prisma.evaluacion.create({
      data: { 
        comentario: evaluacion.comentario,
        calificacionFinal: parseInt(evaluacion.calificacionFinal), 
        ordenId: evaluacion.ordenId,
        usuarioId: evaluacion.usuarioId,
          }, 
    });
  
    response.json(newProducto);
  };
  