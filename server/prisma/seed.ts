import { PrismaClient } from '@prisma/client';
import { categorias } from './seeds/categorias';


const prisma = new PrismaClient();

async function main() {
    await prisma.categorias.createMany({
        data: categorias
    });
}

