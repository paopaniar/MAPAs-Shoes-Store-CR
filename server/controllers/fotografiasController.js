const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import your model

//Obtener listado
module.exports.get = async (request, response, next) => {
    const foto= await prisma.fotografia.findMany({
        include: {
            producto: true,
        },
    });
    response.json(foto); 
};

exports.create = async (req, res) => {
  try {
    const { productoId } = req.params;
    const { filename } = req.file; // Uploaded image filename

    const newFoto = await prisma.fotografia.create({
      data: {
        imagen: filename,
        producto: { connect: { id: Number(productoId) } },
      },
    });

    res.json(newFoto);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the photograph' });
  }
};

 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/images'); // Set your image upload folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, 'image_' + uniqueSuffix + extension);
    }
  });
  
  const upload = multer({ storage: storage });
  
  exports.uploadImage = upload.single('image'); // 'image' should match the field name in your form
  
  exports.create = async (req, res) => {
    try {
      const { productoId } = req.params;
      const { filename } = req.file; // Uploaded image filename
  
      const newFoto = await fotografia.create({
        data: {
          imagen: filename,
          producto: { connect: { id: Number(productoId) } },
        },
      });
  
      res.json(newFoto);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while creating the photograph' });
    }
  };