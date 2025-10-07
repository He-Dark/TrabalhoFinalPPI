export default class Client {
  #cli_id;
  #cli_cpf;
  #cli_nome;
  #cli_telefone;
  #cli_email;

  constructor(id, cpf, nome, telefone, email) {
    this.#cli_id = id;
    this.#cli_cpf = cpf;
    this.#cli_nome = nome;
    this.#cli_telefone = telefone;
    this.#cli_email = email;
  }

  get id() {
    return this.#cli_id;
  }
  set id(id) {
    this.#cli_id = id;
  }

  get cpf() {
    return this.#cli_cpf;
  }
  set cpf(cpf) {
    this.#cli_cpf = cpf;
  }

  get nome() {
    return this.#cli_nome;
  }
  set nome(nome) {
    this.#cli_nome = nome;
  }

  get telefone() {
    return this.#cli_telefone;
  }
  set telefone(telefone) {
    this.#cli_telefone = telefone;
  }

  get email() {
    return this.#cli_email;
  }
  set email(email) {
    this.#cli_email = email;
  }

  toString() {
    return `ID: ${this.#cli_id}, Nome: ${this.#cli_nome}, CPF: ${
      this.#cli_cpf
    }, Telefone: ${this.#cli_telefone}, Email: ${this.#cli_email}`;
  }

  toJSON() {
    return {
      id: this.#cli_id,
      cpf: this.#cli_cpf,
      nome: this.#cli_nome,
      telefone: this.#cli_telefone,
      email: this.#cli_email,
    };
  }
}
