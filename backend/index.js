import express from "express";
import cors from "cors";

import clientRoute from "./routes/clientRoute.js";

const app = express();
const port = 3000;
const host = "0.0.0.0";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/clientes", clientRoute);

app.listen(port, host, () => {
  console.log(`Servidor em execução em http://${host}:${port}`);
});
