'use strict'

//Variable que almacena las teclas
const teclas = document.querySelectorAll('.tecla');
//Variable que almacena los botones de las canciones
const cancionBoton = document.querySelectorAll('.boton');
//Canciones
const cancion1 = ['DO', 'RE', 'MI', 'DO', 'DO', 'RE', 'MI', 'DO', 'MI', 'FA', 'SOL'];
const cancion2 = ['MI', 'RE', 'DO', 'RE', 'MI', 'MI', 'MI', 'RE', 'RE', 'RE', 'MI'];
const cancion3 = ['MI', 'MI', 'FA', 'SOL', 'SOL', 'FA', 'MI', 'RE', 'DO', 'DO', 'RE'];
const cancion4 = ['SOL', 'MI', 'MI', 'FA', 'RE', 'RE', 'DO', 'RE', 'MI', 'FA', 'SOL'];
const canciones = [cancion1, cancion2, cancion3, cancion4];
//Posición en la que se encuentra el usuario en la canción
let posicionUsuario = 0;
let numeroCancion = null;

//hover
teclas.forEach(tecla => {
    tecla.addEventListener ('mouseover', function() {
        tecla.style.background = "#ADD8E6"
    })
})

teclas.forEach(tecla => {
    tecla.addEventListener ('mouseout', function() {
        if(tecla.classList.contains('blanca')) {
            tecla.style.background = "#e5e5e5"
        } else {
            tecla.style.background = "black"
        }
    })
})
//Bucle para reproducir las teclas y pintarlas.
teclas.forEach(tecla => {
    tecla.addEventListener('click', function(){
        var nota = tecla.getAttribute('nota')
        playTecla(nota);
        verificar(nota, numeroCancion);
        tecla.style.background = "red";
        setTimeout(() => {
            tecla.style.background = "white";
        }, 300);
    });
});

//Reproduce los sonidos de cada tecla.
function playTecla(nota) {
    const audio = new Audio('../sonidos/' + nota + '.mp3');
    audio.play();
}

//Bucle del selector de canciones
cancionBoton.forEach(boton => {
    boton.addEventListener('click', function(){
        boton.style.background = "blue";
        numeroCancion = boton.getAttribute('numero')
        reproduceCancion(numeroCancion);
        posicionUsuario = 0;
    });
    
});

//reproduce canción y colorea botones.
function reproduceCancion(numeroCancion) {
        const cancionElegida = canciones[parseInt(numeroCancion) - 1]
        cancionElegida.forEach((notaCancion, indice) => {
        setTimeout(() => {
            playTecla(notaCancion)
            cambiarColor(notaCancion)
            }, indice * 700);    
        })
        ventanaEmergente();
}

//funcion cambiar boton de color con la canción.
function cambiarColor(notaCancion) {
    teclas.forEach(tecla => {
        var nota = tecla.getAttribute('nota')
        if(notaCancion == nota){
            tecla.style.background = "blue";
            setTimeout(() => {
                tecla.style.background = "white";
            }, 700);
        }
    })
}

//Ventana emergente que avisa del turno del jugador.
function ventanaEmergente(){
    setTimeout(() => {
        window.alert("Ahora, toca repetir");
    }, 700 * cancion1.length);
}

//verificar nota dada
function verificar(nota, numCancion) {
    const cancionElegida = canciones[parseInt(numCancion) - 1];
    const notaCancion = cancionElegida[posicionUsuario];
    if(notaCancion === nota) {
        posicionUsuario++;
        setTimeout(() => {
            window.alert("¡Muy bien!")
        }, 200);
      //  reproducirPunto (numeroCancion)
        if (posicionUsuario === cancionElegida.length) {
            setTimeout(() => {
                window.alert("¡Enhorabuena!");
            }, 300);
            posicionUsuario = 0;
        }
    } else {
        posicionUsuario = 0;
        setTimeout(() => {
            window.alert("La próxima vez será, ¡Vuelve a elegir!")
        }, 200);
    }
}

/*function reproducirPunto(numeroCancion) {
    const cancionElegida = canciones[parseInt(numeroCancion) - 1];
    
    for(let i = 0; i <= posicionUsuario; i++) {
        setTimeout(() => {
            playTecla(cancionElegida[i]);
            cambiarColor(cancionElegida[i]);
            }, i*700);
    }
}*/