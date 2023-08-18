
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const metodoPago= await prisma.metodoPago.findMany({
        include: {
            usuario: true,
        },
    });
    response.json(metodoPago); 
};

// Get all payment methods by usuarioId
module.exports.getByUsuarioId = async (request, response, next) => {
  try {
    const usuarioId = parseInt(request.params.usuarioId);
    
    const metodosPago = await prisma.metodoPago.findMany({
      where: {
        usuarioId: usuarioId,
      },
    });
    
    response.json(metodosPago);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (request, response, next) => {
    try {
      let metodoPago = request.body;
      const createMetodoPago = await prisma.metodoPago.create({
        data: {
            usuarioId: metodoPago.usuarioId,
            descripcion: metodoPago.descripcion
        },
      });
      response.json(createMetodoPago);
    } catch (error) {
      next(error);
    }
  };