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
      nombreProducto: 'Tenis Mujer',
      precio: 16500,  
      descripcion: 'Tenis blancas con detalles rosados para mujer',
      cantidadDisponible: 20,
      categoriaId: 1,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Casuales Mujer',
      precio: 13450,  
      descripcion: 'Zapatos casuales negros con detalles en cuero para mujer',
      cantidadDisponible: 20,
      categoriaId: 9,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Mujer',
      precio: 4950,  
      descripcion: 'Sandalias deportivas de suela baja para mujer',
      cantidadDisponible: 20,
      categoriaId: 9,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Hombre',
      precio: 16500,  
      descripcion: 'Tenis blancas con detalles azules para hombre',
      cantidadDisponible: 20,
      categoriaId: 2,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Casuales Hombre',
      precio: 23000,  
      descripcion: 'Zapatos casuales con detalles en cuero para hombre',
      cantidadDisponible: 20,
      categoriaId: 3,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Hombre',
      precio: 4500,  
      descripcion: 'Sandalias bajas para hombre',
      cantidadDisponible: 20,
      categoriaId: 4,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Niñas',
      precio: 12500,  
      descripcion: 'Tenis blancas con detalles rosados para niñas',
      cantidadDisponible: 20,
      categoriaId: 5,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Niños',
      precio: 12000,  
      descripcion: 'Tenis blancas con detalles azules para niños',
      cantidadDisponible: 20,
      categoriaId: 6,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Niñas',
      precio: 2500,  
      descripcion: 'Sandalias para niñas',
      cantidadDisponible: 20,
      categoriaId: 7,
      usuarioId: 2,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Niños',
      precio: 3100,  
      descripcion: 'Sandalias para niños',
      cantidadDisponible: 20,
      categoriaId: 7,
      usuarioId: 2,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Unisex',
      precio: 15000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 8,
      usuarioId: 2,
    }
  });

  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 9,
      usuarioId: 3,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 9,
      usuarioId: 1,
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 9,
      usuarioId: 1,
    }
  });

  // Insert data for table Direccion
  await prisma.direccion.create({
    data: {
      provincia: 'Alajuela',
      canton: 'Alajuela',
      distrito: 'Alajuela',
      barrio: 'UTN',
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
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 1,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:1, iva: 0.13, subtotal: 10400, total: 12400},
          ],
        },
    },
  },
  });

  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 2,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 10000, total: 12000 },
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 2500, total: 4350 },
          ],
        },
    },
    },
  });

  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 2,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 1200, total: 2350 },
            { cantidad: 4, productoId:4 , iva: 0.13, subtotal: 20000, total: 22350},
          ],
        },
    },
    },
  });
  
  await prisma.orden.create({   
    data: {
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 2,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 9000, total: 12350 },
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 5000, total: 8350},
          ],
        },
    },
    },
  });
  
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 1,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 10000, total: 12350 },
          ],
        },
    },
    },
  });
  // Insert data for table OrdenProducto
 

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
      imagen: imagenBytes,
      productoId:1,
    },
  });
  
  await prisma.fotografia.create({
    data: {
      id: 2,
      imagen: imagenBytes,
      productoId:1,
    },
  });
  
  await prisma.fotografia.create({
    data: {
      id: 3,
      imagen: imagenBytes,
      productoId:1,
    },
  });
  
  await prisma.fotografia.create({
    data: {
      id: 4,
      imagen: imagenBytes,
      productoId:1,
    },
  });
  
  await prisma.fotografia.create({
    data: {
      id: 5,
      imagen: imagenBytes,
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