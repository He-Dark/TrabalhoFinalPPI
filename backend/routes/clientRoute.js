import { Router } from "express";
import ClientController from "../controllers/clientController.js";

const router = Router();
const clientController = new ClientController();

router
  .get("/", clientController.consultarTodos)
  .get("/:id", clientController.consultar)
  .post("/", clientController.gravar)
  .put("/:id", clientController.alterar)
  .delete("/:id", clientController.excluir);

export default router;
