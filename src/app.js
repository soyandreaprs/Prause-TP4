import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import express from "express";
import config from "./config/config.js";
import { connection } from "./config/database.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { info } from "./d"
import router from "./routes/user-routes.js";

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(info)))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", router);
app.use(errorHandler);

connection()
  .then(() => console.log("Conexión a DB con éxito"))
  .catch((error) => console.log(error));

const PORT = config.PORT;

// app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`)); 

export default app;