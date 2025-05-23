document.getElementById('formVaca').addEventListener('submit', function(e) {
    e.preventDefault();
  
    if (!confirm("Deseja realmente cadastrar esta vaca?")) return;
  
    const numero = document.getElementById('numero').value;
    const data = document.getElementById('data').value;
    const sexo = document.getElementById('sexo').value;
    const descricao = document.getElementById('descricao').value;
  
    const vaca = { numero, data, sexo, descricao };
  
    const vacas = JSON.parse(localStorage.getItem('vacas')) || [];
    vacas.push(vaca);
    localStorage.setItem('vacas', JSON.stringify(vacas));
  
    this.reset();
    mostrarVacas();
    alert("Vaca cadastrada com sucesso!");
  });
  
  function mostrarVacas() {
    const vacas = JSON.parse(localStorage.getItem('vacas')) || [];
    const lista = document.getElementById('listaVacas');
    lista.innerHTML = '';
  
    if (vacas.length === 0) {
      lista.innerHTML = '<p>Nenhuma vaca cadastrada.</p>';
      return;
    }
  
    vacas.forEach((vaca, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <strong>Nº:</strong> ${vaca.numero}<br>
        <strong>Data Nascimento Bezerro:</strong> ${vaca.data}<br>
        <strong>Sexo do Bezerro:</strong> ${vaca.sexo}<br>
        <strong>Descrição:</strong> ${vaca.descricao}<br>
        <button onclick="removerVaca(${index})">Remover</button>
      `;
      lista.appendChild(div);
    });
  }
  
  function removerVaca(index) {
    if (!confirm("Tem certeza que deseja remover este registro?")) return;
  
    const vacas = JSON.parse(localStorage.getItem('vacas')) || [];
    vacas.splice(index, 1);
    localStorage.setItem('vacas', JSON.stringify(vacas));
    mostrarVacas();
  }
  
  function mostrarAba(id) {
    document.getElementById('cadastro').style.display = id === 'cadastro' ? 'block' : 'none';
    document.getElementById('listagem').style.display = id === 'listagem' ? 'block' : 'none';
  }
  
  mostrarVacas(); // chama no início
  