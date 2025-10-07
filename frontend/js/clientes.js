const formularioCliente = document.getElementById("formCliente");

formularioCliente.onsubmit = gravarCliente;
exibirTabelaClientes();
function validarFormulario() {
  const formValidado = formularioCliente.checkValidity();
  if (formValidado) {
    formularioCliente.classList.remove("was-validated");
  } else {
    formularioCliente.classList.add("was-validated");
  }
  return formValidado;
}

function gravarCliente(evento) {
  evento.preventDefault();
  evento.stopPropagation();

  if (validarFormulario()) {
    const clienteNome = document.getElementById("clienteNome").value;
    const clienteEmail = document.getElementById("clienteEmail").value;
    const clienteTelefone = document.getElementById("clienteTelefone").value;
    const clienteCpf = document.getElementById("clienteCPF").value;

    const id = document.getElementById("clienteId").value;
    const cliente = {
      cli_nome: clienteNome,
      cli_email: clienteEmail,
      cli_telefone: clienteTelefone,
      cli_cpf: clienteCpf,
    };
    let url = "http://localhost:3000/clientes";
    let method = "POST";
    if (id) {
      url += `/${id}`;
      method = "PUT";
    }
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        // alert("Cliente salvo com sucesso!");
        formularioCliente.reset();
        exibirTabelaClientes();
        const modalElement = document.getElementById("clienteModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}

function exibirTabelaClientes() {
  const tabelaClientes = document.getElementById("tabelaClientes");
  tabelaClientes.innerHTML = "";
  fetch("http://localhost:3000/clientes")
    .then((response) => response.json())
    .then((response) => {
      if (response.clientes.length > 0) {
        const tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        const cabecalho = document.createElement("thead");
        cabecalho.innerHTML = `
          <tr>
            <th>ID</th> 
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        `;
        tabela.appendChild(cabecalho);
        const corpoTabela = document.createElement("tbody");

        for (const cliente of response.clientes) {
          const linha = document.createElement("tr");
          linha.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.cli_nome}</td>
            <td>${cliente.cli_email}</td>
            <td>${cliente.cli_telefone}</td>
            <td>${cliente.cli_cpf}</td>
            <td>
              <button class="btn btn-sm btn-primary me-2" onclick="editarCliente(${cliente.id})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
          `;
          corpoTabela.appendChild(linha);
        }
        tabela.appendChild(corpoTabela);
        tabelaClientes.appendChild(tabela);
      }
    });
}

function excluirCliente(id) {
  fetch(`http://localhost:3000/clientes/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      exibirTabelaClientes();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function editarCliente(id) {
  fetch(`http://localhost:3000/clientes/${id}`)
    .then((response) => response.json())
    .then((response) => {
      const cliente = response.cliente;
      document.getElementById("clienteId").value = cliente.id;
      document.getElementById("clienteNome").value = cliente.cli_nome;
      document.getElementById("clienteEmail").value = cliente.cli_email;
      document.getElementById("clienteTelefone").value = cliente.cli_telefone;
      document.getElementById("clienteCPF").value = cliente.cli_cpf;
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
  const modalElement = document.getElementById("clienteModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}
