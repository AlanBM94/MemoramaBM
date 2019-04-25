import {elementos, btnReiniciar, btnResponsivo} from './base';

//Variable que va a llevar el proceso del temporizador
let temporizadorCorriendo;

//Función que muestra el icono
const mostrarIconoTriste = () => {
    const markup = `
        <div class="iconoFin">
            <svg class="iconoFin__icono">
                <use xlink:href="img/symbol-defs.svg#icon-emoji-sad"></use>
            </svg>
        </div> 
    `;
    elementos.contenedorCartas.insertAdjacentHTML('beforeend', markup);
}

//Función que muestra los mensajes si es que perdiste
const mostrarMensajesPerder = () => {
    const markup = `
        <div class="contenedor-central__puntaje">
            <h3 class="puntaje">tu puntaje es <span>0</span></h3>
        </div>
        <div class="contenedor-central__gop">
            <h3 class="gop">perdiste!</h3>
        </div> 
    `
    elementos.contenedorCartas.insertAdjacentHTML('afterend', markup);
}


//Muestra el temporizador en el DOM
export const mostrarTiempo = tiempo=> {
    let contador = 0;
    let param = 0;
    const tiempoMax = parseInt(tiempo) + 1;
    
    //Función que activa el temporizador
    const temporizador = () => { 
        contador++;
        param = tiempoMax - contador;
        if(param > 0){
            //Desactiva el boton mientras el temporizador está corriendo
            elementos.btnJugar.disabled = true;
            //Agrega la clase de boton activo mientras el temporizador está corriendo
            elementos.btnJugar.classList.add('btn--jugar--activo');
            //Muestra en el dom el valor actual del contador
            elementos.temporizador.innerHTML = param;
            elementos.temporizadorResponsive.innerHTML = param;
            
            //Si el parametro es menor o igual a cinco muestra una animación
            if(param <= 5){
                elementos.temporizador.style.animation = 'flash 1.5s infinite linear';
                elementos.temporizadorResponsive.style.animation = 'flash 1.5s infinite linear';
            }
        }else{
            // //Oculta el boton de jugar
            btnReiniciar();
            //Muestra el 0 en pantalla cuando el contador llega a 0
            elementos.temporizador.innerHTML = 0;
            elementos.temporizadorResponsive.innerHTML = 0;
            //Detiene la animación cuando llega a 0
            elementos.temporizador.style.animation = 'flashNo 1.5s infinite linear';
            elementos.temporizadorResponsive.style.animation = 'flashNo 1.5s infinite linear';
            //Detiene el intervalo de tiempo
            clearInterval(temporizadorCorriendo);
            //Se eliminan las cartas si el contador llega a 0
            elementos.cartas.map(elemento => {
                elemento.style.visibility = 'hidden';
            })
            //Muestra el icono triste si llega a 0 el contador
            mostrarIconoTriste();
            //Muestra el mensaje de que perdiste y tu puntaje
            mostrarMensajesPerder();
            //Muestra el btn de reiniciar responsivo
            btnResponsivo();


        }
        
    }
    //Activa el temporizador
    temporizadorCorriendo = setInterval(temporizador, 1000);
}

//Funcipon que desactiva el temporizador
export const desactivarTemporizador = () => {
    elementos.temporizador.style.animation = 'flashNo 1.5s infinite linear';
    elementos.temporizadorResponsive.style.animation = 'flashNo 1.5s infinite linear';
    clearInterval(temporizadorCorriendo);

}

//Se muestra el icono de ganar si el jugador termina el juego antes que se pare el temporizador
export const mostrarIconoGanar = () => {
    const markup = `
        <div class="iconoFin">
            <svg class="iconoFin__icono">
                <use xlink:href="img/symbol-defs.svg#icon-happy"></use>
            </svg>
        </div> 
    `;
    elementos.contenedorCartas.insertAdjacentHTML('beforeend', markup);
}


//Borrar el icono triste
export const eliminarIconoYMensajesPerdida = () => {
    const icono = document.querySelector('.iconoFin');
    const mensaje1 = document.querySelector('.contenedor-central__puntaje');
    const mensaje2 = document.querySelector('.contenedor-central__gop');
    elementos.contenedorCartas.removeChild(icono)
    document.querySelector('.contenedor-central').removeChild(mensaje1);
    document.querySelector('.contenedor-central').removeChild(mensaje2);
}


 


