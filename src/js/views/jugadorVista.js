import {elementos} from './base';

// Obtiene los datos del jugador
export const obtenerDatosJugador = () => {
    const datos = {
        'nombre': elementos.formularioContenido[0].value,
        'tiempo': elementos.formularioContenido[1].value
    }
    return datos;
}

//Función que limpia los inputs
export const limpiarInputs = () => {
    elementos.formularioContenido[0].value = '';
    elementos.formularioContenido[1].value = '';
}
//Obtiene los datos responsive
export const obtenerDatosJugadorResponsive = elemento => {
    const datos = {
        'nombre': elemento[1].value,
        'tiempo': elemento[3].children[0].value
    }
    return datos;
}

//Función que limpia los inputs
export const limpiarInputsResponsive = elemento => {
    elemento.parentElement.children[3].children[0].value = '';
    elemento.parentElement.children[3].children[1].children[0].value = '';
}

//Función que muestra los mensajes de que el jugador ha ganado
export const mostrarMensajes = puntaje => {
    const markup = `
        <div class="contenedor-central__puntaje">
            <h3 class="puntaje">tu puntaje es <span>${puntaje}</span></h3>
        </div>
        <div class="contenedor-central__gop">
            <h3 class="gop">ganaste!</h3>
        </div> 
    `
    elementos.contenedorCartas.insertAdjacentHTML('afterend', markup);
}

//Cuando se reinicia el juego oculta los elementos del puntaje e icono
export const ocultaElementos = () => {
    document.querySelector('.iconoFin').style.visibility = 'hidden';
    document.querySelector('.contenedor-central__puntaje').style.visibility = 'hidden';
    document.querySelector('.contenedor-central__gop').style.visibility = 'hidden';
}

//Obtiene el tiempo Final del jugador
export const tiempoFinal = () => parseInt(elementos.temporizador.textContent);



