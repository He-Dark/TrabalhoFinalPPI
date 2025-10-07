import conectar from "./conexao.js";
import Book from "../models/bookModel.js";
export default class BookDAO {
  async gravar(book) {
    if (!(book instanceof Book)) {
      throw new Error("O parâmetro deve ser uma instância de Book");
    }
    const conn = await conectar();
    const sql = `
                  INSERT INTO livros (liv_titulo, liv_autor, cli_id)
                  VALUES (?, ?, ?)
            `;
    const valores = [book.liv_titulo, book.liv_autor, book.cli_id];
    await conn.execute(sql, valores);
    conn.release();
  }

  async alterar(book) {
    if (!(book instanceof Book)) {
      throw new Error("O parâmetro deve ser uma instância de Book");
    }

    const conn = await conectar();
    const sql = `
                  UPDATE livros 
                    SET liv_titulo = ?, liv_autor = ?, cli_id = ?
                    WHERE id = ?
            `;
    const valores = [book.liv_titulo, book.liv_autor, book.cli_id, book.id];
    await conn.execute(sql, valores);
    conn.release();
  }

  async excluir(id) {
    const conn = await conectar();
    const sql = "DELETE FROM livros WHERE id = ?";
    await conn.execute(sql, [id]);
    conn.release();
  }

  async consultar(id) {
    const conn = await conectar();
    const sql = "SELECT * FROM livros WHERE id = ? LIMIT 1";
    const [rows] = await conn.execute(sql, [id]);
    conn.release();
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Book(row.id, row.liv_titulo, row.liv_autor, row.cli_id);
  }

  async consultarTodos() {
    const conn = await conectar();
    const sql = "SELECT * FROM livros ORDER BY liv_titulo";
    const [rows] = await conn.execute(sql);
    conn.release();
    return rows.map(
      (row) => new Book(row.id, row.liv_titulo, row.liv_autor, row.cli_id)
    );
  }
}
