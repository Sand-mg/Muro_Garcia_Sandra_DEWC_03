'use strict'

//Lo primero, cuando el DOM ya está cargado, carga los datos del JSON.
document.addEventListener('DOMContentLoaded', function() {
    cargarUsuariosJSON();
})

//Array usuarios del JSON
const usuariosArray = [];

/*funcion para leer del JSON*/
function cargarUsuariosJSON () {
    let path = '../json/usuarios.json'
    let request = new Request(path, {
        headers: new Headers({
        'Content-Type': 'text/json'
        }),
        method: 'GET'
    })
    fetch(request).then(response => {
        response.json().then(data => {
        verificarUsuario(data)
        })
    })
    
}

//Introduce los datos obtenidos del fetch en un array de usuarios.
function verificarUsuario(data) {
        data.forEach(user => {
        usuariosArray.push(user)
    });
}

//Verifica contraseña alfanumérica.
function verificarContrasena (contrasena) {
    let expresionRegular = /^[a-zA-Z0-9]+$/;
    let caracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!expresionRegular.test(contrasena)) {
        window.alert ("Contraseña no válida")
        if (caracterEspecial.test(contrasena)) {
            let caracter = contrasena.match(caracterEspecial)
            window.alert ("La contraseña contiene carácteres no válidos, carácter: " + caracter)
        }
    } else {
        return contrasena;
    }
}


//Reacciona al evento al pulsar el botón enviar del formulario.
    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault();

        //Recogen los datos de usuario y contraseña
        var usuario = document.getElementById('nombre').value
        var contrasena = document.getElementById('contrasena').value
        var contrasenaValida = verificarContrasena(contrasena);
        //Si el usuario y la contraseña coinciden, crea un nuevo botón con un enlace a la página del piano.
        let loginCorrecto = usuariosArray.find( persona => persona.usuario === usuario && persona.contraseña === contrasenaValida)
        if(loginCorrecto) {
            //Crea el botón y le da id para ponerlo estilos en la página css.
            let entrarPiano = document.createElement("button")
            entrarPiano.id = "botonNuevo"
            //Crea el enlace
            let enlace = document.createElement('a')
            enlace.textContent = "Enlace al piano";
            enlace.href = "../html/piano.html"
            //agrega el enlace al botón y el botón al DOM en el body.
            entrarPiano.appendChild(enlace)
            document.body.appendChild(entrarPiano)
        } else {
            //Crea un contenedor para agregar un mensaje de error.
            let errorDiv = document.createElement("div")
            errorDiv.id = "errorMensaje"
            //Mensaje de error.
            let errorTexto = document.createTextNode ("El usuario o la contraseña no son correctos, prueba otra vez")
            //Incorpora el mensaje al contenedor y el contenedor al body.
            errorDiv.appendChild(errorTexto)
            document.body.appendChild(errorDiv)
            //Elimina el mensaje de error después de 2s.
            setTimeout(function() {
                errorDiv.remove();
            }, 2000);
        }

})