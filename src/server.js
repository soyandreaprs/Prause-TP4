import express from "express";
import config from "./config/config.js";
import { connection } from "./config/database.js";
import { errorHandler } from "./middlewares/error-handler.js";
import userRouter from "./routes/user-routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use(errorHandler);

connection()
  .then(() => console.log("Conexión a DB con éxito"))
  .catch((error) => console.log(error));

const PORT = config.PORT;

app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));
