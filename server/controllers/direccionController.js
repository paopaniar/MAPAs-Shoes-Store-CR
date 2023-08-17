//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

//response = requests.get('https://api.pruebayerror.com/locaciones/v1/');

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


module.exports.create = async (request, response, next) => {
  let direcciones=request.body;

  const newDireccion =await prisma.direccion.create({
    data:{
      provincia: direccion.provincia,
      canton: direccion.canton,
      distrito: direccion.distrito,
      barrio: direccion.barrio,
      otrasSennas: direccion.otrasSennas,
      usuarioId:direcciones.usuarioId,
  },
  });
  response.json(newDireccion)
};

//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};




