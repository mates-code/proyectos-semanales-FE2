//listado de usuarios del juego
let usuarios = [];


/* ------------------- Funcion para seleccionar qué hacer ------------------- */
function consola() {
  if (!confirm("¿Iniciar consola? 🔛")) {
    return console.log("ARCADE APAGADO.");
  }

  let usuarioActivo = obtenerUsuario();

  let terminarPrograma = false;

  do {
    const menu = parseInt(
      prompt(`Hola ${usuarioActivo}!. Qué deseas hacer:
        1- Jugar al Mayor o Menor!
        2- Ver la tabla de posiciones
        3- Ver los puntajes mayores a 10
        4- Cambiar de usuario
        5- Salir`)
    );

    if (menu === 1) {
      // Opcion 1
      const puntajeJuego = jugarMayorOMenor(usuarioActivo);

      const usuariosActualizados = usuarios.map((usuario) => {
        if (usuario.nombre === usuarioActivo) {
          const puntajeActual = usuario.puntaje;

          console.log(puntajeJuego, puntajeActual);

          if (puntajeJuego > puntajeActual) {
            usuario.puntaje = puntajeJuego;
          }
        }

        return usuario;
      });

      usuarios = usuariosActualizados;

    } else if (menu === 2) {
      // Opcion 2
      mostrarPuntajes();

    } else if (menu === 3) {
      // Opcion 3
      mostrarPuntajesMayoresADiez();

    } else if (menu === 4) {
      // Opcion 4
      usuarioActivo = obtenerUsuario();

    } else if (menu === 5) {
      // Opcion 5
      alert("Hasta luego");
      terminarPrograma = true;
    } else {
      // Cualquier otra opcion
      alert("Opcion no valida");
    }
  } while (!terminarPrograma);
}

// Llamamos a la funcion principal que incia nuestro programa
consola();

/* -------------------------------------------------------------------------- */
/*                   Funcion para obtener el usuario jugador                  */
/* -------------------------------------------------------------------------- */
function obtenerUsuario() {

  const usuarioNuevo = confirm("Bienvenido a la aplicacion de Arcade Web. ¿Eres nuevo por aquí?");
  const nombre = prompt("Ingrese su nombre");

  if (usuarioNuevo) {

    // si es nuevo creamos un objeto con sus nuevos datos
    const usuario = {
      nombre: nombre,
      puntaje: 0
    };

    usuarios.push(usuario);

    return usuario.nombre;

  } else {
    // si no es nuevo lo buscamos en el listado existente
    const usuario = usuarios.find(usuario => usuario.nombre === nombre);

    // si coincide el nombre ingresado en la búsqueda
    if (usuario) {
      return usuario.nombre;
    } else {
      alert("Usuario no encontrado. Probemos otra vez");
      return obtenerUsuario();
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                        Funcion para mostrar puntajes                       */
/* -------------------------------------------------------------------------- */
function mostrarPuntajes() {
  console.log("TABLA DE PUNTAJES");
  console.table(usuarios);
}


/* -------------------------------------------------------------------------- */
/*            Funcion para listar solo quienes tienen 10 pts o más            */
/* -------------------------------------------------------------------------- */
function mostrarPuntajesMayoresADiez() {
  const usuariosMayoresADiez = usuarios.filter(usuario => usuario.puntaje >= 10);

  //chequeamos si hay usuarios con 10 puntos o más
  if (usuariosMayoresADiez.length > 0) {
    console.table(usuariosMayoresADiez);
  } else {
    alert("No hay usuarios con más de 10 puntos");
  }
}

/* -------------------------------------------------------------------------- */
/*                        Funcion: JUEGO mayor o menor                        */
/* -------------------------------------------------------------------------- */
function jugarMayorOMenor(nombreUsuario) {
  //puntajes
  let jugador = {
    puntaje: 0,
    empates: 0,
    vidas: 3
  };


  let partida = true;

  //jugada computadora
  let cartaAnterior = parseInt(Math.random() * 12 + 1);

  while (partida) {
    //jugada del usuario
    let usuario = confirm("La carta es: " + cartaAnterior + "🃏. Si cree que sigue una mayor pulse ACEPTAR, si cree que es menor CANCELAR");

    //carta nueva que sale del mazo
    let cartaNueva = parseInt(Math.random() * 12 + 1);

    // Logica: casos que GANA o PIERDE el usuario
    if (usuario === true && cartaAnterior < cartaNueva) {
      jugador.puntaje++;
      alert(`Bien ahí! salió ${cartaNueva} y es MAYOR`)
    } else if (usuario === false && cartaNueva < cartaAnterior) {
      jugador.puntaje++;
      alert(`Bien ahí! salió ${cartaNueva} y es MENOR`)
    } else if (cartaAnterior === cartaNueva) {
      jugador.empates++;
      alert(`Safaste! salió ${cartaNueva} y es IGUAL, seguis..`)
    } else {
      jugador.vidas--;
      alert(`Lástima! salió ${cartaNueva} y ERRASTE, una vida menos, te quedan: ${jugador.vidas}..`)
    }

    console.table(jugador);

    //actualizamos el valor de la carta anterior
    cartaAnterior = cartaNueva;

    //chequeamos siempre si puede seguir jugando o no
    if (jugador.vidas < 1) {
      partida = false;
    }
  }

  alert("Bien jugado " + nombreUsuario + ", en esta partida tu puntaje fue: " + jugador.puntaje);

  //devolvemos el puntaje final obtenido por el usuario
  return jugador.puntaje;
}