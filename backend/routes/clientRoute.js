import { Router } from "express";

const router = Router();

router
  .get("/", (req, res) => {
    res.json({ message: "Lista de clientes" });
  })
  .get("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `Detalhes do cliente ${id}` });
  })
  .post("/", (req, res) => {
    const novoCliente = req.body;
    res.status(201).json({ message: "Cliente criado", cliente: novoCliente });
  })
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    res.json({
      message: `Cliente ${id} atualizado`,
      atualizacoes: dadosAtualizados,
    });
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `Cliente ${id} excluído` });
  });

export default router;
