exibirTabelaLivros();
const formularioLivro = document.getElementById("formLivro");

formularioLivro.onsubmit = gravarLivro;

function validarFormulario() {
  const formValidado = formularioLivro.checkValidity();
  if (formValidado) {
    formularioLivro.classList.remove("was-validated");
  } else {
    formularioLivro.classList.add("was-validated");
  }
  return formValidado;
}

function gravarLivro(evento) {
  evento.preventDefault();
  evento.stopPropagation();

  if (validarFormulario()) {
    const livroTitulo = document.getElementById("livroTitulo").value;
    const livroAutor = document.getElementById("livroAutor").value;
    const livroClienteId = document.getElementById("livroClienteId").value;
    const id = document.getElementById("livroId").value;
    const livro = {
      liv_titulo: livroTitulo,
      liv_autor: livroAutor,
      cli_id: livroClienteId,
    };
    let url = "http://localhost:3000/livros";
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
      body: JSON.stringify(livro),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        // alert("Livro salvo com sucesso!");
        formularioLivro.reset();
        exibirTabelaLivros();
        const modalElement = document.getElementById("livroModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}

function exibirTabelaLivros() {
  const tabelaLivros = document.getElementById("tabelaLivros");
  tabelaLivros.innerHTML = "";

  fetch("http://localhost:3000/livros")
    .then((response) => response.json())
    .then((response) => {
      if (response.livros.length === 0) {
        tabelaLivros.innerHTML = "<p>Nenhum livro cadastrado.</p>";
        return;
      }
      const tabela = document.createElement("table");
      tabela.className = "table table-striped table-hover";
      const cabecalho = document.createElement("thead");
      cabecalho.innerHTML = ` 
            <tr>    
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Cliente</th>
                <th>Ações</th>
            </tr>
        `;
      tabela.appendChild(cabecalho);
      const corpoTabela = document.createElement("tbody");
      for (const livro of response.livros) {
        const linha = document.createElement("tr");
        linha.innerHTML = ` 
                <td>${livro.id}</td>
                <td>${livro.liv_titulo}</td>
                <td>${livro.liv_autor}</td>
                <td>${livro.cli_id}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2" onclick="editarLivro(${livro.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirLivro(${livro.id})">Excluir</button>
                </td>
            `;
        corpoTabela.appendChild(linha);
      }
      tabela.appendChild(corpoTabela);
      tabelaLivros.appendChild(tabela);
    });
}

function excluirLivro(id) {
  fetch(`http://localhost:3000/livros/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      exibirTabelaLivros();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function editarLivro(id) {
  fetch(`http://localhost:3000/livros/${id}`)
    .then((response) => response.json())
    .then((response) => {
      const livro = response.livro;
      document.getElementById("livroId").value = livro.id;
      document.getElementById("livroTitulo").value = livro.liv_titulo;
      document.getElementById("livroAutor").value = livro.liv_autor;
      document.getElementById("livroClienteId").value = livro.cli_id;
      const modalElement = document.getElementById("livroModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}
