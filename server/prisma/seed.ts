import { PrismaClient } from "@prisma/client";
import { categorias } from "./seeds/categorias";
import {Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.categorias.createMany({
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