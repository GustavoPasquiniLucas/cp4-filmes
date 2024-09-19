// Criando a base de dados de filmes  
let filmes = [
  {
    id: 0,
    nome: 'Harry Potter',
    genero: 'fantasia',
    lancamento: 2001
  },
  {
    id: 1,
    nome: 'Avatar',
    genero: 'fantasia',
    lancamento: 2010
  },
  {
    id: 2,
    nome: 'O Senhor dos Anéis',
    genero: 'fantasia',
    lancamento: 2000,
  },
  {
    id: 3,
    nome: 'Branquelas',
    genero: 'comédia',
    lancamento: 2007
  },
  {
    id: 4,
    nome: 'A Lagoa Azul',
    genero: 'romance',
    lancamento: 1983
  }
];

// Criando um array de filmes favoritos
let filmesFavoritos = [];

// Pegando Elementos HTML
const btn1 = document.querySelector('button');
const listaFilmes = document.querySelector('#listaFilmes');

// Ao carregar a página, executa a função que renderiza os elementos na tela
window.onload = () => {
  // Verifica se existem filmes salvos no localStorage
  if (localStorage.getItem('filmes')) {
    filmes = JSON.parse(localStorage.getItem('filmes')); // Carrega os filmes do localStorage
  }
  
  // Verifica se existem favoritos salvos no localStorage
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  
  // Renderiza a lista de filmes
  renderizarLista();
};

// Função para renderizar filmes na tela
const renderizarLista = () => {
  listaFilmes.innerHTML = ""; // Limpa a tela antes de renderizar
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    listaFilmes.append(itemLista);
    itemLista.innerHTML = `${filme.nome}`;
    
    const favorito = document.createElement('img');
    favorito.src = 'img/heart.svg'; // Define a imagem padrão
    favorito.style.cursor = 'pointer';
    
    // Verifica se o filme está na lista de favoritos e ajusta a imagem
    if (filmesFavoritos.some(favFilme => favFilme.id === filme.id)) {
      favorito.src = 'img/heart-fill.svg'; // Muda a imagem para coração preenchido
    }
    
    // Adiciona evento de clique à imagem
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });
    
    itemLista.append(favorito);
  });
};

// Adiciona o evento de clique ao botão
btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput');
  
  if (inputUsuario.value.trim()) { // Verifica se o input não está vazio
    let id = filmes.length;
    filmes.push({id: id, nome: inputUsuario.value, genero: '', lancamento: ''});
    
    // Salva o array atualizado no localStorage
    localStorage.setItem('filmes', JSON.stringify(filmes));
    
    // Renderiza a lista novamente
    renderizarLista();
    
    // Apaga o campo de digitação
    inputUsuario.value = '';
  }
});

// Função que é executada quando o botão de favorito é clicado
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };
  
  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    salvaFilme(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFilme(objetoFilme.id);
  }
};

// Função executada para salvar o filme no localStorage
const salvaFilme = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos.push(objetoFilme);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
};

// Função executada para remover o filme no localStorage
function removeFilme(id) {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}
