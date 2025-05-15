window.addEventListener('load', () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach((usuario, index) => {
      adicionarUsuarioNaTabela(usuario, index);
    });
  });
  document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
      const novoUsuario = { nome, email, senha };
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      adicionarUsuarioNaTabela(novoUsuario, usuarios.length - 1);
      document.getElementById('cadastroForm').reset();
    }
  });
    function adicionarUsuarioNaTabela(usuario, index) {
    const tabela = document.getElementById('tabelaUsuarios').querySelector('tbody');
    const novaLinha = tabela.insertRow();
  
    novaLinha.insertCell(0).textContent = usuario.nome;
    novaLinha.insertCell(1).textContent = usuario.email;
    novaLinha.insertCell(2).textContent = usuario.senha;
  
    const celulaAcao = novaLinha.insertCell(3);
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function () {
      excluirUsuario(index);
    };
    celulaAcao.appendChild(botaoExcluir);
  }
  function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarTabela();
  }
  function atualizarTabela() {
    const tabela = document.getElementById('tabelaUsuarios').querySelector('tbody');
    tabela.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach((usuario, index) => {
      adicionarUsuarioNaTabela(usuario, index);
    });
  }