/* --------------------------- listado de almbumes --------------------------- */
const albumesFamosos = [{
  id: "x123",
    nombre: "Nevermind",
    imagen: "https://m.media-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg",
    like: true
  },
  {
    id: "y123",
    nombre: "Thriller",
    imagen: "https://img.discogs.com/LfnH5tbhcZ4xRMNLAodIyvea9xA=/fit-in/600x600/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-294033-1151290881.jpeg.jpg",
    like: true
  },
  {
    id: "z123",
    nombre: "The wall",
    imagen: "https://img.discogs.com/EbLYco6R1A-5Z7QJ4t4O1JSzsM8=/fit-in/587x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4620059-1370165707-3841.jpeg.jpg",
    like: false
  },
  {
    id: "f123",
    nombre: "Abbey Road",
    imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/RDH5EPH2TNENPI73NBWUWWMLPA.jpg",
    like: false
  },
  {
    id: "a123",
    nombre: "Origin of Symmetry",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_967206-MLA26105577132_102017-O.webp",
    like: false
  },
  {
    id: "a123",
    nombre: "Back in Black",
    imagen: "https://i1.wp.com/www.scienceofnoise.net/wp-content/uploads/2020/07/068660474366a63e1263e53ff370eb50.jpg",
    like: false
  }
];

const nombreUsuario = document.querySelector('#nombreUsuario');
const cantAlbums = document.querySelector('#cant-albums');
const cantFavoritos = document.querySelector('#cant-favoritos');

const covers = document.querySelector('.covers');

/* -------------------------------------------------------------------------- */
/*                    FUNCION: captar el nombre de usuario                    */
/* -------------------------------------------------------------------------- */
//prompt, classList, toggle, listener
function obtenerUsuario() {
  const usuario = prompt('Nombre de usuario:');
  nombreUsuario.innerText = usuario
}
obtenerUsuario();

/* -------------------------------------------------------------------------- */
/*                     FUNCION: mostrar datos del usuario                     */
/* -------------------------------------------------------------------------- */
// - contar la cantidad de albumes del array y pintar en el span correspondiente
// - contar la cantidad de favoritos y pintar en el span correspondiente
// - tener en cuenta: usar la palabra en plural solo cuando sea necesario
function mostrarDatosEnPerfil() {
  cantAlbums.innerText = `${albumesFamosos.length} ${albumesFamosos.length === 1 ? 'álbum' : 'álbumes'}`

  // contamos la cantidad de favoritos
  let favoriteados = 0;
  albumesFamosos.forEach(album => {
    if(album.like){
      favoriteados++;
    }
  });
  cantFavoritos.innerText = `${favoriteados} ${favoriteados === 1 ? 'favorito' : 'favoritos'}`

}
mostrarDatosEnPerfil();


/* -------------------------------------------------------------------------- */
/*                  FUNCION: renderizar tarjetas del almbumes                 */
/* -------------------------------------------------------------------------- */
//map, template strings, innerHTML
function renderizarAlbumes() {
  covers.innerHTML = '';

  albumesFamosos.map((album) => {
    return covers.innerHTML += `
    <li data-id="${album.id}">
    <img src="${album.imagen}" alt="${album.nombre}">
    <p>${album.nombre}</p>
    <i onclick="marcarFavorito('${album.id}')" class="fa fa-heart ${album.like ? 'favorito' : ''}"></i>
  </li>
`
  })
};

renderizarAlbumes();

/* -------------------------------------------------------------------------- */
/*                          FUNCION: marcar favorito                          */
/* -------------------------------------------------------------------------- */
// - buscar el album por data-id en el array 
// - cambiar el estado del like
// - eliminar el contenido del listadoFavoritos(para no duplicar)
// - volver a renderizar
function marcarFavorito(identificador) {
  albumesFamosos.forEach( album => {
    if(album.id === identificador){
      // le ponemos el valor contrario al que ya tenia
      album.like = !album.like;
    }
  });

  console.log(albumesFamosos);

  // volvemos a mostrar las tarjetas y actualizamos tambien los datos de perfil
  renderizarAlbumes();
  mostrarDatosEnPerfil();
}