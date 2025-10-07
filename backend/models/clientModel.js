import ClientDAO from "../db/clientDAO.js";

export default class Client {
  #id;
  #cli_cpf;
  #cli_nome;
  #cli_telefone;
  #cli_email;

  constructor(id, cli_cpf, cli_nome, cli_telefone, cli_email) {
    this.#id = id;
    this.#cli_cpf = cli_cpf;
    this.#cli_nome = cli_nome;
    this.#cli_telefone = cli_telefone;
    this.#cli_email = cli_email;
  }

  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }

  get cli_cpf() {
    return this.#cli_cpf;
  }
  set cli_cpf(cpf) {
    this.#cli_cpf = cpf;
  }

  get cli_nome() {
    return this.#cli_nome;
  }
  set cli_nome(nome) {
    this.#cli_nome = nome;
  }

  get cli_telefone() {
    return this.#cli_telefone;
  }
  set cli_telefone(telefone) {
    this.#cli_telefone = telefone;
  }

  get cli_email() {
    return this.#cli_email;
  }
  set cli_email(email) {
    this.#cli_email = email;
  }

  toString() {
    return `ID: ${this.#id}, Nome: ${this.#cli_nome}, CPF: ${
      this.#cli_cpf
    }, Telefone: ${this.#cli_telefone}, Email: ${this.#cli_email}`;
  }

  toJSON() {
    return {
      id: this.#id,
      cli_cpf: this.#cli_cpf,
      cli_nome: this.#cli_nome,
      cli_telefone: this.#cli_telefone,
      cli_email: this.#cli_email,
    };
  }

  async gravar() {
    const dao = new ClientDAO();
    await dao.gravar(this);
  }

  async alterar() {
    const dao = new ClientDAO();
    await dao.alterar(this);
  }

  async excluir() {
    const dao = new ClientDAO();
    await dao.excluir(this.#id);
  }

  async consultar() {
    const dao = new ClientDAO();
    return await dao.consultar(this.#id);
  }

  async consultarTodos() {
    const dao = new ClientDAO();
    return await dao.consultarTodos();
  }
}
