const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
const axios = require('axios'); 

// module.exports.get = async (request, response, next) => {
//   try {
//     // Make a GET request to the external API
//     const apiResponse = await axios.get('https://api.pruebayerror.com/locaciones/v1/provincias?incluir=cantones,distritos');

//     console.log(apiResponse.data); // Log the API response data to the console

//     // Extract the desired data from the API response
//     const provincias = apiResponse.data; // Adjust this line based on the response structure

//     response.json(provincias);
//   } catch (error) {
//     // Handle the error and send an appropriate response
//     console.error(error);
//     response.status(500).json({ error: 'An error occurred' });
//   }
// };

// module.exports.get = async (request, response, next) => {
    
//       const apiUrl = 'https://levelupcr.github.io/APIProvinciasCR/CRAPI.json'; // Reemplaza con la URL de la API externa
//         const apiResponse = await axios.get(apiUrl);
//         const dataFromApi = apiResponse.data;
//       response.json(dataFromApi);
//     
//   };

module.exports.get = async (request, response, next) => {
  const direcciones = await prisma.direccion.findMany({
    include: { usuario: true },
  });
  response.json(direcciones);
};
module.exports.getById = async (request, response, next) => {
  let direccionId = parseInt(request.params.id);
  const direccion = await prisma.direccion.findUnique({
    where: { id: direccionId },
    include: { usuario: true },
  });
  response.json(direccion);
};

module.exports.getByUsuario = async (request, response, next) => {
  let usuarioId = parseInt(request.params.usuarioId);
  const direcciones = await prisma.direccion.findMany({
    where: { usuarioId: usuarioId },
    include: { usuario: true },
  });
  response.json(direcciones);
};

module.exports.create = async (request, response, next) => {
  let direccion = request.body;
    const newDireccion = await prisma.direccion.create({
      data: {
        provincia: direccion.provincia.nombre,
        canton: direccion.canton.nombre,
        distrito: direccion.distrito.nombre,
        otrasSennas: direccion.otrasSennas,
        usuarioId: direccion.usuarioId,
      },
  });
  response.json(newDireccion)
};

//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};






