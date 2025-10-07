import conectar from "./conexao.js";
import Client from "../models/clientModel.js";

export default class ClientDAO {
  async gravar(client) {
    if (!(client instanceof Client)) {
      throw new Error("O parâmetro deve ser uma instância de Client");
    }
    const conn = await conectar();
    const sql = `
            INSERT INTO clientes (cli_cpf, cli_nome, cli_telefone, cli_email)
            VALUES (?, ?, ?, ?)
        `;
    const valores = [
      client.cli_cpf,
      client.cli_nome,
      client.cli_telefone,
      client.cli_email,
    ];
    await conn.execute(sql, valores);
    conn.release();
  }

  async alterar(client) {
    if (!(client instanceof Client)) {
      throw new Error("O parâmetro deve ser uma instância de Client");
    }

    const conn = await conectar();
    const sql = `
            UPDATE clientes
            SET cli_cpf = ?, cli_nome = ?, cli_telefone = ?, cli_email = ?
            WHERE id = ?
        `;
    const valores = [
      client.cli_cpf,
      client.cli_nome,
      client.cli_telefone,
      client.cli_email,
      client.id,
    ];
    await conn.execute(sql, valores);
    conn.release();
  }

  async excluir(id) {
    const conn = await conectar();
    const sql = "DELETE FROM clientes WHERE id = ?";
    await conn.execute(sql, [id]);
    conn.release();
  }

  async consultar(id) {
    const conn = await conectar();
    const sql = "SELECT * FROM clientes WHERE id = ? LIMIT 1";
    const [rows] = await conn.execute(sql, [id]);
    conn.release();

    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Client(
      row.id,
      row.cli_cpf,
      row.cli_nome,
      row.cli_telefone,
      row.cli_email
    );
  }

  async consultarTodos() {
    const conn = await conectar();
    const sql = "SELECT * FROM clientes ORDER BY cli_nome";
    const [rows] = await conn.execute(sql);
    conn.release();
    return rows.map(
      (row) =>
        new Client(
          row.id,
          row.cli_cpf,
          row.cli_nome,
          row.cli_telefone,
          row.cli_email
        )
    );
  }
}
