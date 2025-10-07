// clientes.js - Simulação CRUD em localStorage

const CLIENTES_KEY = "app_clientes_v1";

function carregarClientes() {
  const raw = localStorage.getItem(CLIENTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function salvarClientes(clientes) {
  localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
}

function gerarId() {
  return Date.now().toString();
}

// Validações simples
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarCPFFormat(cpf) {
  // aceita 000.000.000-00 ou somente dígitos
  const re = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
  return re.test(cpf);
}

// Formatação: se recebeu 11 dígitos, formata com pontos e hífen
function formatarCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Render
function renderClientes() {
  const clientes = carregarClientes();
  const tbody = document.querySelector("#tabelaClientes tbody");
  tbody.innerHTML = "";

  if (clientes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center">Nenhum cliente cadastrado.</td></tr>';
    return;
  }

  clientes.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
<td>${c.nome}</td>
<td>${c.email}</td>
<td>${formatarCPF(c.cpf)}</td>
<td>${c.telefone || ""}</td>
<td>
<button class="btn btn-sm btn-primary btn-editar" data-id="${
      c.id
    }">Editar</button>
<button class="btn btn-sm btn-danger btn-excluir" data-id="${
      c.id
    }">Excluir</button>
<a class="btn btn-sm btn-outline-secondary" href="livros.html?clienteId=${
      c.id
    }">Ver Livros</a>
</td>
`;
    tbody.appendChild(tr);
  });
}
