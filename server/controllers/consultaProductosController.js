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

// Define the controller method
// module.exports.insertResponses = async (request, response, next) => {
//     try {
//         const { responses } = request.body;
//         for (const { preguntaId, respuesta } of responses) {
//             await prisma.consultaProductos.updateMany({
//                 where: {
//                     id: preguntaId,
//                 },
//                 data: {
//                     respuesta: respuesta,
//                 },
//             });
//         }

//         // Send a success response
//         response.json({ message: 'Responses inserted successfully.' });
//     } catch (error) {
//         // Handle errors
//         next(error);
//     }
// };
module.exports.createResponses = async (request, response, next) => {
    try {
        // Retrieve data from the request body
        const { productoId, responses } = request.body;

        // Loop through the responses and create a response for each consultaProductos
        for (const { mensajeId, respuesta } of responses) {
            await prisma.consultaProductos.update({
                where: {
                    id: mensajeId,
                    productoId: productoId,
                },
                data: {
                    respuesta: respuesta,
                },
            });
        }
        response.json({ message: 'Responses created successfully.' });
    } catch (error) {
        // Handle errors
        next(error);
    }
};



