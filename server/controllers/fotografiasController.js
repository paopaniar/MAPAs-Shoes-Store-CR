const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const foto= await prisma.fotografia.findMany({
        include: {
            producto: true,
        },
    });
    response.json(foto); 
};


exports.create = async (request, response, next) => {
    try {
      const idproducto = parseInt(request.params.id);
      const { imagen } = request.files;
  
      // Assuming you want to store the image path or URL, change 'imagen.data' to the image path/URL
      const imagePath = 'assets/images/'+{imagen}; // Replace with the actual path or URL
  
      const newFoto = await prisma.fotografia.create({
        data: {
          imagen: imagePath, // Store the image path or URL here
          producto: { connect: { id: idproducto } }, // Connect to the corresponding producto
        },
      });
  
      response.json(newFoto);
    } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ error: 'An error occurred while creating the photograph' });
    }
  };
  
 
  