const form = document.getElementById("form-vaca");
const pesquisa = document.getElementById("pesquisa");
const listaMachos = document.getElementById("lista-machos");
const listaFemeas = document.getElementById("lista-femeas");
const exportarPdfBtn = document.getElementById("exportar-pdf");

let vacas = JSON.parse(localStorage.getItem("vacas")) || [];

function atualizarLista(filtro = "") {
  listaMachos.innerHTML = "";
  listaFemeas.innerHTML = "";

  const machosFiltrados = vacas.filter(
    v => v.sexo === "Macho" && (v.numero.includes(filtro) || v.descricao.toLowerCase().includes(filtro.toLowerCase()))
  );
  const femeasFiltradas = vacas.filter(
    v => v.sexo === "Fêmea" && (v.numero.includes(filtro) || v.descricao.toLowerCase().includes(filtro.toLowerCase()))
  );

  machosFiltrados.forEach((vaca) => {
    const div = document.createElement("div");
    div.className = "bg-gray-100 p-4 rounded shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <p><strong>Número:</strong> ${vaca.numero}</p>
        <p><strong>Data Nasc.:</strong> ${vaca.data}</p>
        <p><strong>Descrição:</strong> ${vaca.descricao}</p>
      </div>
      <button onclick="removerVaca(${vacas.indexOf(vaca)})" class="text-red-500 hover:text-red-700 material-icons" title="Remover">delete</button>
    `;

    listaMachos.appendChild(div);
  });

  femeasFiltradas.forEach((vaca) => {
    const div = document.createElement("div");
    div.className = "bg-gray-100 p-4 rounded shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <p><strong>Número:</strong> ${vaca.numero}</p>
        <p><strong>Data Nasc.:</strong> ${vaca.data}</p>
        <p><strong>Descrição:</strong> ${vaca.descricao}</p>
      </div>
      <button onclick="removerVaca(${vacas.indexOf(vaca)})" class="text-red-500 hover:text-red-700 material-icons" title="Remover">delete</button>
    `;

    listaFemeas.appendChild(div);
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
// deixar a função acessível globalmente para o botão inline
window.removerVaca = removerVaca;

pesquisa.addEventListener("input", () => {
  atualizarLista(pesquisa.value);
});

atualizarLista();

const { jsPDF } = window.jspdf;

exportarPdfBtn.addEventListener("click", () => {
  if (vacas.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Controle de Vacas - Exportação", 14, 22);
  doc.setFontSize(12);

  let y = 30;

  vacas.forEach((vaca, i) => {
    doc.text(`Número: ${vaca.numero}`, 14, y);
    y += 8;
    doc.text(`Data Nasc.: ${vaca.data}`, 14, y);
    y += 8;
    doc.text(`Sexo: ${vaca.sexo}`, 14, y);
    y += 8;
    doc.text(`Descrição: ${vaca.descricao}`, 14, y);
    y += 12;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("controle-de-vacas.pdf");
});
