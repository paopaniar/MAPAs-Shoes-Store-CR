
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

 
    // module.exports.update = async (request, response, next) => {
    //   try {
    //     let metodosPago = request.body;
    //     let metodoPagoId = parseInt(request.body.id);
    //     const updateMetodoPago = await prisma.metodoPago.update({
    //       where: { id: metodoPagoId },
    //       data: {
    //         descripcion: metodosPago.descripcion,
    //         usuarioId: metodosPago.usuarioId,
    //       },
    //     });
    //     response.json(updateMetodoPago);
    //   } catch (error) {
    //     next(error);
    //   }
    // };

}