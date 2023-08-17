//Nela deje notas importantes para que pueda entender el codigo con facilidad
//por cada controlador vamos  a tener un archivo de rutas
//para correr el servidor y verlo en la pag web npm run dev

const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

//--npm install bcrypt
const bcrypt = require("bcrypt");
//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
      estado: true,
      rol: true,
    },
  });
  response.json(usuarios);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idUser=parseInt(request.params.id);
    const usuarios=await prisma.usuario.findUnique({
        where: {id: idUser}
    })
    response.json(usuarios);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
  try {
    const idUsuario = parseInt(request.params.id);
    const newData = request.body;
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: idUsuario },
      data: newData,
    });
    response.json(usuarioActualizado);
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
        rol: true,
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
      rol: true,
    },
  });
  response.json(usuarios);
};
module.exports.register = async (request, response, next) => {
    const userData = request.body;
      let salt= bcrypt.genSaltSync(10);
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
        rol: Role[userData.rol]
      },
    });
    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
  };
  module.exports.login = async (request, response, next) => {
    let userReq = request.body;
    //Buscar el usuario según el email dado
    const user = await prisma.usuario.findUnique({
      where: {
        email: userReq.email,
      },
    });
    //Sino lo encuentra según su email
    if (!user) {
      response.status(401).send({
        success: false,
        message: "Usuario no registrado",
      });
    }
    //Verifica la contraseña
    const checkPassword=await bcrypt.compare(userReq.contrasenna, user.contrasenna);
    if(checkPassword === false){
      response.status(401).send({
        success:false,
        message: "Credenciales no validas"
      })
    }else{
      //Usuario correcto
      //Crear el payload
      const payload={
        email: user.email,
        rol: user.rol
      }
      //Crear el token
      const token= jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        data: {
          user,
          token,
        }
      })
    }
  };