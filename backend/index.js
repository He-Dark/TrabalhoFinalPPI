import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
const host = "0.0.0.0";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.listen(port, host, () => {
  console.log(`Servidor em execução em http://${host}:${port}`);
});
