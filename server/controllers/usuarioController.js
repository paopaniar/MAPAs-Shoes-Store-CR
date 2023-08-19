
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      primerApellido:true,
      segundoApellido:true,
      identificacion:true,
      email: true,
      estado: true,
      direcciones: {
        select: {
          id: true,
          otrasSennas: true,
          otrasSennas: true,
          provincia:true,
          canton:true,
          distrito:true,
        }
      },
      ordenes:true,
      productos:true,
      metodosPago: {
        select:{
          id:true,
          descripcion:true,
        },
      },
    roles:{
      select:{
        id:true,
        descripcion:true,
      },
    },
    },
  });
  response.json(usuarios);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idUser=parseInt(request.params.id);
    const usuarios=await prisma.usuario.findUnique({
        where: {id: idUser},
        select: {
          id: true,
          primerApellido:true,
          segundoApellido:true,
          identificacion:true,
          ordenes:true,
          productos:true,
          nombre: true,
          email: true,
          estado: true,
          direcciones: {
            select: {
              id: true,
              otrasSennas: true,
              provincia:true,
              canton:true,
              distrito:true,
            }
          },
          metodosPago:
          {
            select:{
              id:true,
              descripcion:true,
            },
          },
         roles: {
          select:{
            id:true,
            descripcion:true,
          },
          },
        },
    })
    response.json(usuarios);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const usuarioActual = await prisma.usuario.findUnique({
    where: { id: id },
  });
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: id },
      data: { estado: usuarioActual.estado ? 0 : 1 },
    });
    response.json(updatedUsuario);
  } catch (error) {
    next(error);
  }
};

exports.getByStatus = async (request, response, next) => {
  const estado = parseInt(request.params.estado);
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { estado: estado }, // 1 para activos, 0 para inactivos
      select: {
        id: true,
        nombre: true,
        email: true,
        estado: true,
        roles: true,
      },
    });

    response.json(usuarios);
  } catch (error) {
    next(error);
  }
};
module.exports.getByStatusFalse = async (request, response, next) => {
  let estado=parseInt(request.params.estado);
  const usuarios = await prisma.usuario.findUnique({
    where: { estado: estado },
    include: {
      id: true,
      nombre: true,    
      email: true,
      estado: true,
      roles: true,
    },
  });
  response.json(usuarios);
};
module.exports.register = async (request, response, next) => {

  const userData = request.body;

  let salt= bcrypt.genSaltSync(10);

  const roles = userData.roles.map((rol) => parseInt(rol));

  let hash=bcrypt.hashSync(userData.contrasenna,salt);

    const user = await prisma.usuario.create({
      data: {
        nombre: userData.nombre,
        email: userData.email,
        contrasenna: hash,
        primerApellido: userData.primerApellido,
        segundoApellido: userData.segundoApellido,
        identificacion: userData.identificacion,
        estado: userData.estado,
        roles: {
          connect: roles.map((rol) => ({ id: rol })),
        },
      },
    });
    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
  };


  module.exports.login = async (request, response, next) => {
    let solicitud = request.body;
    console.log(solicitud);
  
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email: solicitud.email },
        include: { roles: true },
      });
  
      if (!usuario) {
        return response.status(401).send({
          success: false,
          message: "Acceso denegado: El usuario no existe",
        });
      }
        const verificarContrasenna = bcrypt.compareSync(
        solicitud.contrasenna,
        usuario.contrasenna
      );
  
      if (verificarContrasenna) {
        if (!usuario.estado) {
          return response.status(401).send({
            success: false,
            message: "Acceso denegado: El usuario está inactivo",
          });
        }
  
        const payload = {
          email: usuario.email,
          roles: usuario.roles,
        };
  
        // Crear el token con el payload y el tiempo de expiración
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRE,
        });
  
        return response.json({
          success: true,
          message: "Inicio de sesión exitoso",
          data: { usuario, token },
        });
      } else {
        return response.status(401).send({
          success: false,
          message: "Acceso denegado: Verifique los datos ingresados",
        });
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      return response.status(500).send({
        success: false,
        message: "Error en el servidor",
      });
    }
  };
  
  module.exports.createDireccion = async (request, response, next) => {
    try {
      let { otrasSennas } = request.body;
      let { usuarioId } = request.body;
      const newPregunta = await prisma.direccion.create({
        data: {
          provincia:provincia,
          canton:canton,
          distrito:distrito,
          otrasSennas: otrasSennas,
          usuarioId: usuarioId,
        },
      });
  
      response.json(newPregunta);
    } catch (error) {
      console.error('Error creating question:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.createMetodoPago = async (request, response, next) => {
    try {
      let { descripcion } = request.body;
      let { usuarioId } = request.body;
      const newPregunta = await prisma.metodoPago.create({
        data: {
          descripcion: descripcion,
          usuarioId: usuarioId,
        },
      });
  
      response.json(newPregunta);
    } catch (error) {
      console.error('Error creating question:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.get = async (request, response, next) => {
    const direcciones = await prisma.direccion.findMany({
      include: { usuario: true },
    });
    response.json(direcciones);
  };