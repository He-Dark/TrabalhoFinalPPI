import { Router } from "express";
import BookController from "../controllers/bookController.js";

const router = Router();
const bookController = new BookController();

router
  .get("/", bookController.consultarTodos)
  .get("/:id", bookController.consultar)
  .post("/", bookController.gravar)
  .put("/:id", bookController.alterar)
  .delete("/:id", bookController.excluir);

export default router;
