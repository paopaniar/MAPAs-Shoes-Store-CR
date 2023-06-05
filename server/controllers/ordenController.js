

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const orden= await prisma.orden.findMany();
    response.json(orden); 
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


