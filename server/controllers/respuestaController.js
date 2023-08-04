const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const consultaProductoController=require("../controllers/respuestaController");
const auth=require("../middleware/auth");

module.exports.get = async (request, response, next) => {
    const respuestas = await prisma.respuesta.findMany({
      orderBy: { 
        respuesta: "asc",
      },
    });
    response.json(respuestas);
  };
  