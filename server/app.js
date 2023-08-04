//aqui vamos a definir las rutas
// npm run dev este comando para llamar los scripts. vamos a usar postman para hacer las consultas
//este es primordial ya que es el que ejecuta nuestra migracion a mysql npx prisma migrate dev --name init

const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();
//---Archivos de rutas---
const usuarioRoutes=require("./routes/usuarioRoutes");
const productoRoutes=require("./routes/productoRoutes");
const ordenRoutes=require("./routes/ordenRoutes");
const categoriaRoutes = require("./routes/categoriasRoutes");
const consultaProductosRoutes=require("./routes/consultaProductosRoutes")
const ordenProductoRoutes=require("./routes/ordenProductoRoutes");
const direccionRoutes=require("./routes/direccionRoutes");
const respuestaRoutes=require("./routes/respuestaRoutes");

app.use(express.static('./image'));
// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//---- Definir rutas ----
app.use("/usuario/", usuarioRoutes);
app.use("/producto/", productoRoutes);
app.use("/orden/", ordenRoutes);
app.use("/ordenProducto/", ordenProductoRoutes);
app.use("/direccion/", direccionRoutes);
app.use("/categoria/", categoriaRoutes);
app.use("/consultaProductos/", consultaProductosRoutes)
app.use("/respuesta/", respuestaRoutes)

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});
