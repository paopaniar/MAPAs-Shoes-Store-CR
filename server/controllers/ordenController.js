

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

module.exports.getById = async (request, response, next) => {
    let idorden=parseInt(request.params.id);
    const ordenes=await prisma.orden.findUnique({
        where: {id: idorden},
     include:{
        usuario:true,
        metodoPago:true,
        direccion:true,
        ordenProductos: {
            include: {
                producto:{
                  include:{
                    usuario: true,
                  },
                },
            },
          },
     },
    });
    response.json(ordenes);
};

module.exports.getByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const ordenes = await prisma.orden.findMany({
    where: {
      ordenProductos: {
        every: {
          producto: {
            usuarioId: id
          }
        }
      }
    },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        select: {
          id: true,
          cantidad: true,
          iva: true,
          subtotal: true,
          total: true,
          ordenId: true,
          producto: {
            select: {
              nombreProducto: true,
              precio: true,
              descripcion: true,
              usuario: {
                select: {
                  nombre: true,
                  primerApellido: true,
                  segundoApellido: true
                }
              }
            }
          }
        }
      }
    }
  });
  response.json(ordenes);
};

module.exports.getByClient = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const ordenes = await prisma.orden.findMany({
    where: {usuarioId: id },
    include: {
      usuario: true,
      metodoPago: true,
      direccion: true,
      ordenProductos: {
        select: {
          id: true,
          cantidad: true,
          iva: true,
          subtotal: true,
          total: true,
          ordenId: true,
          producto: {
            select: {
              nombreProducto: true,
              precio: true,
              descripcion: true,
              usuario: {
                select: {
                  nombre: true,
                  primerApellido: true,
                  segundoApellido: true
                }
              }
            }
          }
        }
      }
    }
  });
  response.json(ordenes);
};
  
module.exports.create = async (request, response, next) => {
  let infoOrden=request.body;

  const newProducto =await prisma.orden.create({
    data:{
      fechaOrden:infoOrden.fechaOrden,
      usuarioId: infoOrden.usuarioId,
      metodoPagoId:1,
      direccionId:1,
      ordenProductos:{
        createMany:{
          data: infoOrden.ordenProductos
        }
      }
  }
  })
  response.json(newProducto)
};
module.exports.update = async (request, response, next) => {
};


