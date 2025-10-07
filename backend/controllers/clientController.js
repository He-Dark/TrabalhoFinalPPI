import Client from "../models/clientModel.js";

export default class ClientController {
  async gravar(req, res) {
    if (req.method != "POST" || !req.is("application/json")) {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      if (!req.body) {
        res.status(400).json({ error: "Requisição inválida" });
      }

      const dados = req.body;

      if (
        !dados.cli_cpf ||
        !dados.cli_nome ||
        !dados.cli_telefone ||
        !dados.cli_email
      ) {
        res.status(400).json({ error: "Dados incompletos" });
      }

      const novoCliente = new Client(
        null,
        dados.cli_cpf,
        dados.cli_nome,
        dados.cli_telefone,
        dados.cli_email
      );

      await novoCliente.gravar();

      res.status(201).json({
        message: "Cliente criado",
        cliente: novoCliente,
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
      console.log(id);

      const dados = req.body;

      if (
        !dados.cli_cpf ||
        !dados.cli_nome ||
        !dados.cli_telefone ||
        !dados.cli_email
      ) {
        res.status(400).json({ error: "Dados incompletos" });
      }
      const clienteExistente = new Client(
        id,
        dados.cli_cpf,
        dados.cli_nome,
        dados.cli_telefone,
        dados.cli_email
      );

      await clienteExistente.alterar();
      res.status(200).json({
        message: "Cliente atualizado",
        cliente: clienteExistente,
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
      const cliente = new Client(id);
      await cliente.excluir();
      res.status(200).json({ message: "Cliente excluído", status: true });
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
      const cliente = new Client(id);
      const resultado = await cliente.consultar();
      res.status(200).json({ cliente: resultado, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  async consultarTodos(req, res) {
    if (req.method != "GET") {
      res.status(405).json({ error: "Método não permitido" });
    }
    try {
      const cliente = new Client();
      const resultado = await cliente.consultarTodos();
      res.status(200).json({ clientes: resultado, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }
}
