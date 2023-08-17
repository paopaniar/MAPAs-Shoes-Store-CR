
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
module.exports.create = async (request, response, next) => {
    try {
      let metodoPago = request.body;
      const createMetodoPago = await prisma.metodoPago.create({
        data: {
            descripcion: metodoPago.descripcion
        },
      });
      response.json(createMetodoPago);
    } catch (error) {
      next(error);
    }
  };