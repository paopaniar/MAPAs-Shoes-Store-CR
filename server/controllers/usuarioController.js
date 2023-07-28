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
    const usuario= await prisma.usuario.findMany(); //NOTAS: esto es como un select de usuarios
    response.json(usuario); // este response es como un return
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
};


module.exports.register = async (request, response, next) => {
    const userData = request.body;
  
    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt= bcrypt.genSaltSync(10);
    // Hash password
    let hash=bcrypt.hashSync(userData.contrasenna,salt);
    const user = await prisma.usuario.create({
      data: {
        nombre: userData.nombre,
        email: userData.email,
        contrasenna: hash,
        rol: Role[userData.role]
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