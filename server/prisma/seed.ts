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
await prisma.usuario.create({
  data: {
    email: 'nelarom@gmail.com',
    nombre: 'Marianela',
    primerApellido: 'Romero',
    segundoApellido: 'Mendez',
    rol: Role.USER,
    contrasenna: 'user1234',
    identificacion: '118460558',
    estado:1
    }
  });
await prisma.usuario.create({
  data: {
    email: 'kat@gmail.com',
    nombre: 'Katia',
    primerApellido: 'Duran',
    segundoApellido: 'Gomez',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '235896479',
    estado:1
    }
  });
await prisma.usuario.create({
  data: {
    email: 'leo@gmail.com',
    nombre: 'Leonardo',
    primerApellido: 'Hernandez',
    segundoApellido: 'Benavides',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '118098703',
    estado:1
    }
  });
await prisma.usuario.create({
  data: {
    email: 'sofi@gmail.com',
    nombre: 'Sofia',
    primerApellido: 'Lai',
    segundoApellido: 'Solano',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '106350968',
    estado:1
    }
  });
await prisma.usuario.create({
  data: {
    email: 'adidas0@gmail.com',
    nombre: 'ADIDAS',
    primerApellido: 'ADIDAS',
    segundoApellido: 'ADIDAS',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '111111111',
    estado: 1
  }
});
await prisma.usuario.create({
  data: {
    email: 'nike@gmail.com',
    nombre: 'NIKE',
    primerApellido: 'NIKE',
    segundoApellido: 'NIKE',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '222222222',
    estado: 1
  }
});
await prisma.usuario.create({
  data: {
    email: 'converse@gmail.com',
    nombre: 'Converse',
    primerApellido: 'Converse',
    segundoApellido: 'Converse',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '333333333',
    estado: 1
  }
});

await prisma.usuario.create({
  data: {
    email: 'vans@gmail.com',
    nombre: 'VANS',
    primerApellido: 'VANS',
    segundoApellido: 'VANS',
    rol: Role.SALES,
    contrasenna: 'user1234',
    identificacion: '333333333',
    estado: 1
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
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Quiero saber si tienen mas colores', respuesta:'Sí, hay blancas, rosadas, negras y verdes', usuarioId: 8 },
            { mensaje: 'Quiero saber si hay talla 36', respuesta:'Tenemos desde 35.5 hasta 42', usuarioId: 9 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Casuales Mujer',
      precio: 13450,  
      descripcion: 'Zapatos casuales negros con detalles en cuero para mujer',
      cantidadDisponible: 20,
      categoriaId: 1,
      usuarioId: 3,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Quiero saber si hay talla 36', respuesta:'Tenemos desde 35.5 hasta 42', usuarioId: 9 },
          ],
        },
    },
      
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Mujer',
      precio: 4950,  
      descripcion: 'Sandalias deportivas de suela baja para mujer',
      cantidadDisponible: 20,
      categoriaId: 1,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Es buen material?', respuesta:'', usuarioId: 10 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Hombre',
      precio: 16500,  
      descripcion: 'Tenis blancas con detalles azules para hombre',
      cantidadDisponible: 20,
      categoriaId: 2,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Quiero saber cuanto cuesta', respuesta:'Tiene un precio de 16500', usuarioId: 11 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Casuales Hombre',
      precio: 23000,  
      descripcion: 'Zapatos casuales con detalles en cuero para hombre',
      cantidadDisponible: 20,
      categoriaId: 2,
      usuarioId: 3,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Hay mas colores?', respuesta:'', usuarioId: 8 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Hombre',
      precio: 4500,  
      descripcion: 'Sandalias bajas para hombre',
      cantidadDisponible: 20,
      categoriaId: 4,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Tiene 36.5', respuesta:'No, tenemos disponibles  a partir de 38', usuarioId: 8 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Niñas',
      precio: 12500,  
      descripcion: 'Tenis blancas con detalles rosados para niñas',
      cantidadDisponible: 20,
      categoriaId: 4,
      usuarioId: 6,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Tiene el color negro?', respuesta:'No, solo estan disponibles las de la imagen', usuarioId: 10 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Niños',
      precio: 12000,  
      descripcion: 'Tenis blancas con detalles azules para niños',
      cantidadDisponible: 20,
      categoriaId: 3,
      usuarioId: 3,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Cual es la talla mas baja?', respuesta:'Tenemos disponible desde talla para los bebés', usuarioId: 11 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Niñas',
      precio: 2500,  
      descripcion: 'Sandalias para niñas',
      cantidadDisponible: 20,
      categoriaId: 4,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Precio', respuesta:'', usuarioId: 8 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Niños',
      precio: 3100,  
      descripcion: 'Sandalias para niños',
      cantidadDisponible: 20,
      categoriaId: 3,
      usuarioId: 6,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'No me gustaron', respuesta:'', usuarioId: 8 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Tenis Unisex',
      precio: 15000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 5,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Preciosas?', respuesta:'', usuarioId: 8 },
          ],
        },
    },
    }
  });

  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 5,
      usuarioId: 3,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Muy pequeñas', respuesta:'', usuarioId: 9 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 5,
      usuarioId: 6,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'No son igual a la imagen?', respuesta:'Lamentamos el inconveniente', usuarioId: 11 },
          ],
        },
    },
    }
  });
  await prisma.producto.create({
    data: {
      nombreProducto: 'Sandalias Unisex',
      precio: 10000,  
      descripcion: 'Unisex',
      cantidadDisponible: 20,
      categoriaId: 5,
      usuarioId: 5,
      consultaProductos: {
        createMany: {
          data: [
            { mensaje: 'Precio', respuesta:'Están en 10 mil colores.', usuarioId: 10 },
          ],
        },
    },
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
  await prisma.metodoPago.create({
    data: {
      id: 2,
      descripcion: 'Efectivo',
      usuarioId:4,
    },
  });
  await prisma.metodoPago.create({
    data: {
      id: 3,
      descripcion: 'SINPE',
      usuarioId:1,
    },
  });

//cliente 1
  await prisma.orden.create({   
    data: {  
      fechaOrden: new Date(), 
      totalOrden: 12400,
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
      totalOrden: 4350,
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 1,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 2500, total: 4350 },
          ],
        },
    },
    },
  });
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      totalOrden: 16350,
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 1,
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

  //otro cliente 4
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      totalOrden: 24700,
      direccionId:1,
      metodoPagoId:2,
      usuarioId: 4,
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
      totalOrden: 12350,
      direccionId:1,
      metodoPagoId:2,
      usuarioId: 4,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 9000, total: 12350 },
          ],
        },
    },
    },
  });
  
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(),
      totalOrden: 51650, 
      direccionId:1,
      metodoPagoId:2,
      usuarioId: 1,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 10000, total: 12350 },
            { cantidad: 2, productoId:1, iva: 0.13, subtotal: 15000, total: 16950 },
          ],
        },
    },
    },
  });
  //otro cliente 7
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      totalOrden: 24700,
      direccionId:1,
      metodoPagoId:3,
      usuarioId: 1,
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
      totalOrden: 4350,
      direccionId:1,
      metodoPagoId:3,
      usuarioId: 4,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 2500, total: 4350 },
          ],
        },
    },
    },
  });
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(), 
      totalOrden: 16350,
      direccionId:1,
      metodoPagoId:3,
      usuarioId: 1,
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


  //orden vendedor 3
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(),
      totalOrden: 22350, 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 4,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
          ],
        },
    },
    },
  });
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(),
      totalOrden: 34700, 
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
  await prisma.orden.create({   
    data: { 
      fechaOrden: new Date(),
      totalOrden: 51650, 
      direccionId:1,
      metodoPagoId:1,
      usuarioId: 4,
      ordenProductos: {
        createMany: {
          data: [
            { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
            { cantidad: 4, productoId:4, iva: 0.13, subtotal: 10000, total: 12350 },
            { cantidad: 2, productoId:8, iva: 0.13, subtotal: 15000, total: 16950 },
          ],
        },
    },
    },
  });

//orden vendedor 5
await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 12350, 
    direccionId:1,
    metodoPagoId:2,
    usuarioId: 1,
    ordenProductos: {
      createMany: {
        data: [
          { cantidad: 3, productoId:6, iva: 0.13, subtotal: 18900, total: 12350 },
        ],
      },
  },
  },
});
await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 34700, 
    direccionId:1,
    metodoPagoId:1,
    usuarioId: 4,
    ordenProductos: {
      createMany: {
        data: [
          { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
          { cantidad: 1, productoId:4, iva: 0.13, subtotal: 10000, total: 12350 },
        ],
      },
  },
  },
});
await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 22350, 
    direccionId:1,
    metodoPagoId:2,
    usuarioId: 1,
    ordenProductos: {
      createMany: {
        data: [
          { cantidad: 2, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
         
        ],
      },
  },
  },
});


//orden vendedor 6
await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 12350, 
    direccionId:1,
    metodoPagoId:2,
    usuarioId: 1,
    ordenProductos: {
      createMany: {
        data: [
          { cantidad: 3, productoId:6, iva: 0.13, subtotal: 18900, total: 12350 },
        ],
      },
  },
  },
});await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 34700, 
    direccionId:1,
    metodoPagoId:1,
    usuarioId: 4,
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
await prisma.orden.create({   
  data: { 
    fechaOrden: new Date(),
    totalOrden: 51650, 
    direccionId:1,
    metodoPagoId:1,
    usuarioId: 1,
    ordenProductos: {
      createMany: {
        data: [
          { cantidad: 1, productoId:2, iva: 0.13, subtotal: 20000, total: 22350 },
          { cantidad: 4, productoId:4, iva: 0.13, subtotal: 10000, total: 12350 },
          { cantidad: 2, productoId:8, iva: 0.13, subtotal: 15000, total: 16950 },
        ],
      },
  },
  },
});

  // Insert data for table OrdenProducto
 

  // Insert data for table Comentario_Respuesta
 

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