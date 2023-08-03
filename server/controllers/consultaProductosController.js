const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const preguntas = await prisma.consultaProductos.findMany({
        include: {
            producto: true,
            usuario: true
        }
    });
    response.json(preguntas);
};


module.exports.getByProducto = async (request, response, next) => {
    let idPregunta=parseInt(request.params.id);
    const preguntas= await prisma.consultaProductos.findMany({
        where: {productoId: idPregunta},
        include: {
            producto  : true,
            usuario   : true,
      },
    });
    response.json(preguntas);
};


module.exports.createResponseForMessage = async (request, response, next) => {
  try {
    const { respuesta } = request.body;
    const idConsultaProducto = parseInt(request.params.id);

    // Fetch the consultaProducto based on the given ID
    const consultaProducto = await prisma.consultaProductos.findUnique({
      where: {
        id: idConsultaProducto,
      },
    });
    if (!consultaProducto) {
      return response.status(404).json({ error: 'ConsultaProducto not found' });
    }

    // Update the existing consultaProducto with the new response
    const updatedConsultaProducto = await prisma.consultaProductos.update({
      where: {
        id: consultaProductos.id,
      },
      data: {
        respuesta: respuesta,
      },
    });

    response.json(updatedConsultaProducto);
  } catch (error) {
    console.error('Error creating response:', error);
    response.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Make sure to disconnect from Prisma when done
  }
};
  
  




