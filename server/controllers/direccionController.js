//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

//response = requests.get('https://api.pruebayerror.com/locaciones/v1/');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
const axios = require('axios');

module.exports.get = async (request, response, next) => {
  try {
    // Make a GET request to the external API
    const apiResponse = await axios.get('https://api.pruebayerror.com/locaciones/v1/provincias?incluir=cantones,distritos');

    console.log(apiResponse.data); // Log the API response data to the console

    // Extract the desired data from the API response
    const provincias = apiResponse.data; // Adjust this line based on the response structure

    response.json(provincias);
  } catch (error) {
    // Handle the error and send an appropriate response
    console.error(error);
    response.status(500).json({ error: 'An error occurred' });
  }
};



//Obtener por Id
module.exports.getById = async (request, response, next) => {
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};




