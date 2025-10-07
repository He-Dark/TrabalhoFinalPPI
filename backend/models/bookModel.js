import BookDAO from "../db/bookDAO.js";

export default class Book {
  #id;
  #liv_titulo;
  #liv_autor;
  #cli_id;

  constructor(id, liv_titulo, liv_autor, cli_id) {
    this.#id = id;
    this.#liv_titulo = liv_titulo;
    this.#liv_autor = liv_autor;
    this.#cli_id = cli_id;
  }

  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }

  get liv_titulo() {
    return this.#liv_titulo;
  }
  set liv_titulo(titulo) {
    this.#liv_titulo = titulo;
  }

  get liv_autor() {
    return this.#liv_autor;
  }
  set liv_autor(autor) {
    this.#liv_autor = autor;
  }

  get cli_id() {
    return this.#cli_id;
  }
  set cli_id(cli_id) {
    this.#cli_id = cli_id;
  }

  toString() {
    return `ID: ${this.#id}, Título: ${this.#liv_titulo}, Autor: ${
      this.#liv_autor
    }, ID do Cliente: ${this.#cli_id}`;
  }

  toJSON() {
    return {
      id: this.#id,
      liv_titulo: this.#liv_titulo,
      liv_autor: this.#liv_autor,
      cli_id: this.#cli_id,
    };
  }

  async gravar() {
    const dao = new BookDAO();
    await dao.gravar(this);
  }

  async alterar() {
    const dao = new BookDAO();
    await dao.alterar(this);
  }

  async excluir() {
    const dao = new BookDAO();
    await dao.excluir(this.#id);
  }

  async consultar() {
    const dao = new BookDAO();
    return await dao.consultar(this.#id);
  }

  async consultarTodos() {
    const dao = new BookDAO();
    return await dao.consultarTodos();
  }
}
