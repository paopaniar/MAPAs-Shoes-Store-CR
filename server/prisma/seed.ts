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
      role: Role.USER,
      password: 'user1234',
      identificacion: '207940152',
    }
  });
  await prisma.usuario.create({
    data: {
      email: 'admin@gmail.com',
      nombre: 'Administrador',
      primerApellido: 'Mapas',
      segundoApellido: 'Shoes',
      role: Role.ADMIN,
      password: 'user1234',
      identificacion: '207940153',
    }
  });
  await prisma.usuario.create({
    data: {
      email: 'sales@gmail.com',
      nombre: 'Vendedor',
      primerApellido: 'Mapas',
      segundoApellido: 'Shoes',
      role: Role.SALES,
      password: 'user1234',
      identificacion: '207940154',
    }
  });
   await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Mujes',
      categoriaId: 1,
      precio: 16500,
      description: 'Tenis blancas con detalles rosados para mujer',
      imagen: imagenBytes,
      cantidadDisponible: 20,     
    }
  });


  await prisma.orden.create({
    data: {
      fechaOrden: new Date(),
      usuario: {
        connect: { id: 1 },
      },
    },
  });

  // Insert data for table OrdenProducto
  await prisma.ordenProducto.create({
    data: {
      orden: {
        connect: { id: 1 },
      },
      producto: {
        connect: { id: 1 },
      },
      cantidad: 2,
      total: 9.99,
      iva: 0.99,
    },
  });


  // Insert data for table Direccion
  await prisma.direccion.create({
    data: {
      provincia: 'Province 1',
      canton: 'Canton 1',
      distrito: 'Distrito 1',
      barrio: 'Barrio 1',
      otrasSennas: 'Address details',
    },
  });

  // Insert data for table Comentario_Respuesta
  await prisma.comentario_Respuesta.create({
    data: {
      comentario: 'Comment 1',
      respuesta: 'Reply 1',
    },
  });

  // Insert data for table Producto_Usuario_Comentario
  await prisma.producto_Usuario_Comentario.create({
    data: {
      comentario_respuesta: {
        connect: { id: 1 },
      },
      usuario: {
        connect: { id: 1 },
      },
      producto: {
        connect: { id: 1 },
      },
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