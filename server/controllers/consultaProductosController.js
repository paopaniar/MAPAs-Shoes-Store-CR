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


module.exports.createResponses = async (request, response, next) => {
    try {
        const { respuesta } = request.body;
        const idConsultaProducto = parseInt(request.params.id);

        // Fetch the consultaProductos based on the given ID
        const consultaProducto = await prisma.consultaProductos.findUnique({
            where: {
                id: idConsultaProducto,
            },
        });

        if (!consultaProducto) {
            return response.status(404).json({ error: 'ConsultaProducto not found' });
        }

        // Insert the new response into the database
        const newRespuesta = await prisma.respuesta.create({
            data: {
                respuesta: respuesta,
                productoId: consultaProducto.productoId,
                usuarioId: 1, // Replace 1 with the actual user ID from the request or your authentication mechanism
            },
        });

        response.json(newRespuesta);
    } catch (error) {
        console.error('Error creating response:', error);
        response.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect(); // Make sure to disconnect from Prisma when done
    }
};

