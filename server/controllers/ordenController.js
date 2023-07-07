

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const orden= await prisma.orden.findMany({
        orderBy: {
            fechaOrden: 'asc',
          },
        include: {
            usuario: true,
            metodoPago:true,
            direccion:true,
        },
    });
    response.json(orden); 
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idorden=parseInt(request.params.id);
    const ordenes=await prisma.orden.findUnique({
        where: {id: idorden},
     include:{
        usuario:true,
        metodoPago:true,
        direccion:true,
        ordenProductos: {
            select: {
                orden: true,
              cantidad: true,
            },
          },
     },
    });
    response.json(ordenes);
};

module.exports.getByClient = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const ordenes=await prisma.orden.findMany({
        where: {usuarioId: id},
     include:{
        usuario:true,
        metodoPago:true,
        direccion:true,
        ordenProductos: {
            select: {
                id: true,
                cantidad: true,
                iva: true,
                subtotal: true,
                total: true,
                ordenId: true,
                producto: true, 
            },
          },
     },
    });
    response.json(ordenes);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
};


