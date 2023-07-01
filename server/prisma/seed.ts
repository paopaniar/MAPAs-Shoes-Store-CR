import { PrismaClient } from "@prisma/client";
import { categorias } from "./seeds/categorias";
import {Role } from "@prisma/client";
const prisma = new PrismaClient();

const fs = require('fs');
const imagenBytes = fs.readFileSync('image/tenis.jpg');
async function main() {
  await prisma.categoria.createMany({
    data: categorias,
  });

  await prisma.usuario.create({
    data: {
      email: 'panipao0@gmail.com',
      nombre: 'Paola',
      primerApellido: 'Paniagua',
      segundoApellido: 'Arroyo',
      rol: Role.USER,
      contrasenna: 'user1234',
      identificacion: '207940152',
      estado: 1
    }
  });
  await prisma.usuario.create({
    data: {
      email: 'admin@gmail.com',
      nombre: 'Administrador',
      primerApellido: 'Mapas',
      segundoApellido: 'Shoes',
      rol: Role.ADMIN,
      contrasenna: 'user1234',
      identificacion: '207940153',
      estado: 1
    }
  });
  await prisma.usuario.create({
    data: {
      email: 'sales@gmail.com',
      nombre: 'Vendedor',
      primerApellido: 'Mapas',
      segundoApellido: 'Shoes',
      rol: Role.SALES,
      contrasenna: 'user1234',
      identificacion: '207940154',
      estado:1
    }
  });
   await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Mujes',
      precio: 16500,  
      descripcion: 'Tenis blancas con detalles rosados para mujer',
      cantidadDisponible: 20,
      categoriaId: 1,
    }
  });

  // Insert data for table Direccion
  await prisma.direccion.create({
    data: {
      provincia: 'Province 1',
      canton: 'Canton 1',
      distrito: 'Distrito 1',
      barrio: 'Barrio 1',
      otrasSennas: 'Address details',
      usuarioId:1,
    },
  });
  await prisma.metodoPago.create({
    data: {
      id: 1,
      descripcion: 'Tarjeta',
      usuarioId:1,
    },
  });
  await prisma.orden.create({   
    data: {
      id: 1,  
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 1,
    },
  });

  // Insert data for table OrdenProducto
  await prisma.ordenDetalle.create({
    data: {
      orden: {
        connect: { id: 1 },
      },
      producto: {
        connect: { id: 1 },
      },
      cantidad: 2,
      subtotal: 10.99,
      total: 9.99,
      iva: 0.99,
      },
    });



  // Insert data for table Comentario_Respuesta
  await prisma.consultaProductos.create({
    data: {
      id: 1,
      mensaje: 'quiero saber cuanto cuesta',
      respuesta: 'tiene un precio de 2000',
      productoId:1,
      usuarioId:1,
    },
  });

  await prisma.fotografia.create({
    data: {
      id: 1,
      productoId:1,
    },
  });
 
await prisma.evaluacion.create({
    data: {
      comentario: 'pruebas de sistema',
      calificacionFinal: 10,
      usuarioId: 2,
      ordenId: 1
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });