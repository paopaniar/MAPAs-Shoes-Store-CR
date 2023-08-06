
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