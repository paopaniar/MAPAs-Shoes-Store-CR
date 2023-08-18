const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.get = async (request, response, next) => {
  const roles = await prisma.rol.findMany();
  response.json(roles);
};

module.exports.getById = async (request, response, next) => {
  let rolId = parseInt(request.params.id);
  const rolesid = await prisma.rol.findUnique({
    where: { id: rolId },
  });
  response.json(rolesid);
};

  
