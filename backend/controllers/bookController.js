import Book from "../models/bookModel.js";

export default class BookController {
  async gravar(req, res) {
    if (req.method != "POST" || !req.is("application/json")) {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      if (!req.body) {
        res.status(400).json({ error: "Requisição inválida" });
      }

      const dados = req.body;

      if (!dados.liv_titulo || !dados.liv_autor || !dados.cli_id) {
        res.status(400).json({ error: "Dados incompletos" });
      }

      const novoLivro = new Book(
        null,
        dados.liv_titulo,
        dados.liv_autor,
        dados.cli_id
      );

      await novoLivro.gravar();

      res.status(201).json({
        message: "Livro criado",
        livro: novoLivro,
        status: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  async alterar(req, res) {
    if (req.method != "PUT" || !req.is("application/json")) {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      if (!req.body) {
        res.status(400).json({ error: "Requisição inválida" });
      }
      const { id } = req.params;
      const dados = req.body;
      if (!dados.liv_titulo || !dados.liv_autor || !dados.cli_id) {
        res.status(400).json({ error: "Dados incompletos" });
      }

      const livroExistente = new Book(
        id,
        dados.liv_titulo,
        dados.liv_autor,
        dados.cli_id
      );

      await livroExistente.alterar();
      res.status(200).json({
        message: "Livro alterado",
        livro: livroExistente,
        status: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  async excluir(req, res) {
    if (req.method != "DELETE") {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      const { id } = req.params;
      const livroExistente = new Book(id);
      await livroExistente.excluir();
      res.status(200).json({
        message: "Livro excluído",
        status: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  async consultar(req, res) {
    if (req.method != "GET") {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      const { id } = req.params;
      const livro = new Book(id);
      const resultado = await livro.consultar();
      res.status(200).json({ livro: resultado, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  async consultarTodos(req, res) {
    if (req.method != "GET") {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      const livro = new Book();
      const resultado = await livro.consultarTodos();
      res.status(200).json({ livros: resultado, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }
}
