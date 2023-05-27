import { PrismaClient } from "@prisma/client";
import { categorias } from "./seeds/categorias";

const prisma = new PrismaClient();

async function main() {
  await prisma.categorias.createMany({
    data: categorias,
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