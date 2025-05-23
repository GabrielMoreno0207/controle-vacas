const form = document.getElementById("form-vaca");
const lista = document.getElementById("lista");
const pesquisa = document.getElementById("pesquisa");

let vacas = JSON.parse(localStorage.getItem("vacas")) || [];

function atualizarLista(filtro = "") {
  lista.innerHTML = "";

  vacas
    .filter(v => v.numero.includes(filtro) || v.descricao.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((vaca, index) => {
      const div = document.createElement("div");
      div.className = "bg-gray-100 p-4 rounded shadow flex justify-between items-center";

      div.innerHTML = `
        <div>
          <p><strong>Número:</strong> ${vaca.numero}</p>
          <p><strong>Data Nasc.:</strong> ${vaca.data}</p>
          <p><strong>Sexo:</strong> ${vaca.sexo}</p>
          <p><strong>Descrição:</strong> ${vaca.descricao}</p>
        </div>
        <button onclick="removerVaca(${index})" class="text-red-500 hover:text-red-700 material-icons">delete</button>
      `;

      lista.appendChild(div);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (confirm("Deseja cadastrar essa vaca?")) {
    const numero = document.getElementById("numero").value;
    const data = document.getElementById("data").value;
    const sexo = document.getElementById("sexo").value;
    const descricao = document.getElementById("descricao").value;

    vacas.push({ numero, data, sexo, descricao });
    localStorage.setItem("vacas", JSON.stringify(vacas));
    form.reset();
    atualizarLista();
  }
});

function removerVaca(index) {
  if (confirm("Tem certeza que deseja remover este cadastro?")) {
    vacas.splice(index, 1);
    localStorage.setItem("vacas", JSON.stringify(vacas));
    atualizarLista();
  }
}

pesquisa.addEventListener("input", () => {
  atualizarLista(pesquisa.value);
});

atualizarLista();
