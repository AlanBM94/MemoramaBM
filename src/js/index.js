// Global app controller
const scss = require('../sass/main.scss');
import Jugador from './models/jugador';
import Temporizador from './models/temporizador';
import Carta from './models/carta';
import Par from './models/par';
import Puntajes from './models/puntaje';
import {elementos, btnReiniciar, activarMenuResponsive, btnResponsivo, mostrarElementoPopUp, eliminarElementoPopUp} from './views/base';
import * as jugadorVista from './views/jugadorVista';
import * as temporizadorVista from './views/temporizadorVista';
import * as cartaVista from './views/cartaVista';
import * as parVista from './views/parVista';
import * as puntajeVista from './views/puntajeVista';


// ------------------Estado--------------------

//Lleva el estado del juego
const estado = {
    'inicio': false,
    'jugadores': [],
    'ganar' : [],
    'fin': () => {
        temporizadorVista.desactivarTemporizador();
        temporizadorVista.mostrarIconoGanar();
        btnResponsivo();
    },
    'reiniciar': () => {
        temporizadorVista.eliminarIconoYMensajesPerdida();
        cartaVista.mostrarCartas();
        cartaVista.cartasVolteadas();
        jugadorVista.limpiarInputs();
        puntajeVista.limpiarPuntajes();

    }
    
    
}


// ---------------------Controladores----------------------

// Controlador de los datos del jugador
const controladorJugador = elemento => {
    if(elemento){
        const datos = jugadorVista.obtenerDatosJugador();
        if((elemento.nombre == '' || elemento.tiempo == '')){
            alert('Ingresa tu nombre y tiempo de la partida');
        }else if((elemento.nombre.length > 8)){
            alert('El nombre no puede tener más de 8 caracteres');
        }
        else{
            estado.inicio = true;
            cartaVista.reordenarCartas();
            // Crea una nueva instancia de la clase Jugador
            estado.nuevoJugador = new Jugador(elemento.nombre, elemento.tiempo);
            estado.jugadores.push(estado.nuevoJugador);
        }
        
    }
    else{
        const datos = jugadorVista.obtenerDatosJugador();
        if((elementos.formularioContenido[0].value == '' || elementos.formularioContenido[1].value == '')){
            alert('Ingresa tu nombre y tiempo de la partida');
        }else if((elementos.formularioContenido[0].value.length > 8)){
            alert('El nombre no puede tener más de 8 caracteres');
        }else{
            estado.inicio = true;
            cartaVista.reordenarCartas();
            // Crea una nueva instancia de la clase Jugador
            estado.nuevoJugador = new Jugador(datos.nombre, datos.tiempo);
            estado.jugadores.push(estado.nuevoJugador);
        }
    }
    
}

//Controlador del temporizador
const controladorTemporizador = () => {
    // Crea una nueva instancia de la clase Temporizador
    estado.tiempo = new Temporizador(estado.nuevoJugador.tiempo);
    temporizadorVista.mostrarTiempo(estado.tiempo.tiempo);
    
}

//Controlador de la carta presionada
const controladorCarta = () => {
    if(estado.nuevoJugador){
        cartaVista.voltearCarta(estado.carta.cartaSeleccionada)
    }else{
        alert('Ingresa tus datos para iniciar el juego');
    }
    
}

//Controlador de el par seleccionado
const controladorPar = () => {
    //Si no se ha hecho una instancia de la clase Par antes se hace una 
    if(!estado.par){
        estado.par = new Par();
    }
    
    //Si no se encuentra el id de la carta seleccionada agrega la carta seleccionada al arreglo par
    //Se que alguna de las cartas de los pares volteados no se pueda volver a meter al arreglo
    if(!estado.par.comprobarCarta(estado.carta.cartaSeleccionada.id)){
        estado.par.obtenerPar(estado.carta.cartaSeleccionada.id);
    }
    
    // Se asigna a la variable parSeleccionado el atributo par de la clase par 
    let parSeleccionado = estado.par.parArreglo;
    if(parSeleccionado.length == 2){
        //Obtiene las imagenes de las cartas que han sido seleccionadas
        const objetoPar = parVista.comprobarParIgual(parSeleccionado[0], parSeleccionado[1]);
        //Agrega el valor true o false dependiendo si las imagenes de las cartas seleccionadas son iguales o no
        const valorPar = estado.par.comprobarIgualdadPar(objetoPar);
        //Si las cartas son iguales agregan a un objeto
        if(valorPar){
            const parCorrecto = {
                'carta1': estado.par.parArreglo[0],
                'carta2': estado.par.parArreglo[1]
            }
            
            //Oculta los pares que son iguales
            document.querySelector(`#${parCorrecto.carta1}`).style.visibility = 'hidden';
            document.querySelector(`#${parCorrecto.carta2}`).style.visibility = 'hidden';
            //Se elimina todos las cartas del arreglo de cartas
            estado.par.parArreglo = [];
            //Cada par que es correcto lo agrega al estado.ganar
            estado.ganar.push(parCorrecto);
            
            //Si el atributo del objeto ganar tiene un arreglo con 10 elementos se termina el juego
            if(estado.ganar.length == 10){
                // //Desactiva el temporizador 
                estado.fin();

                estado.nuevoJugador.organizarFecha();
                
                //Crea un objeto con el tiempo que duró la partida y el el tiempo en el que se paró el temporizador
                const tiempoTotal = {
                    'tiempoInicial': parseInt(estado.tiempo.tiempo),
                    'tiempoFinal': jugadorVista.tiempoFinal()
                }

                //Obtiene el tiempo record del jugador
                estado.nuevoJugador.tiempoPartida(tiempoTotal);
                //Obtiene el puntaje del jugador
                estado.nuevoJugador.obtenerPuntaje(tiempoTotal);
                //Imprime el puntaje en la pantalla
                jugadorVista.mostrarMensajes(estado.nuevoJugador.puntaje);
                //Agrega un jugador al arreglo de jugadores de la clase puntajes
                estado.puntaje.agregarJugador(estado.nuevoJugador);
                //Ordena los puntajes empezando por el puntaje más alto
                estado.mejoresPuntajes = estado.puntaje.ordenarArreglo(estado.puntaje.leerStorage());
                //Limpia los puntajes anteriores
                puntajeVista.limpiarPuntajes();
                //Muestra los nuevos puntajes después de un segundo
                setTimeout(() => {
                    estado.mejoresPuntajes.map(elemento => puntajeVista.mostrarPuntajes(elemento));
                }, 1000);
                //Muestra el botón de reiniciar en el DOM
                btnReiniciar();
            }
            //Si las cartas no son iguales hace el siguiente proceso
        }else{
            //Después de un 300 milisegundos voltea las cartas del par que no es igual
            setTimeout(() => { 
                parVista.voltearCartas(estado.par.parArreglo);
                //Se elimina todos las cartas del arreglo de cartas
                estado.par.parArreglo = [];
            }, 300);
            
        }
    }
    
}



// ----------------------Eventos------------------------------


// Evento que se dispara cuando haces click en el boton 'jugar'
elementos.btnJugar.addEventListener('click', () => {
    controladorJugador();
    if(estado.nuevoJugador.tiempo.tiempo !== ''){
        controladorTemporizador();
    }
    
});


//Evento que se dispara cuando se presiona una carta
    elementos.cartas.map(elemento => {
        elemento.addEventListener('click', e => {
            e.preventDefault();
            //Se crea una instancia de la clase carta
            estado.carta = new Carta(elemento);
            controladorCarta();
            if(estado.inicio){
                controladorPar();
            }
        })
    })




//Evento que se dispara cuando el boton de reiniciar es presionado
elementos.btnReiniciar.addEventListener('click', e =>{
    e.preventDefault();
    //Elimina los iconos, los mensajes, limpia los inputs y voltea las cartas
    estado.reiniciar();
    //Activa el botón de jugar
    elementos.btnJugar.disabled = false;
    //Oculta el botón de reiniciar
    elementos.btnReiniciar.style.visibility = 'hidden';
    //Muestra el botón de jugar
    elementos.btnJugar.style.visibility = 'visible';
    //Quita la clase del botón activo
    elementos.btnJugar.classList.remove('btn--jugar--activo');
    //Pone la clase original del boton
    elementos.btnJugar.classList.add('btn--jugar');
    //Agrega el 0 al temporizador en el DOM
    elementos.temporizador.innerHTML = 0;
    //Pone el estado del nuevo jugaor en falso
    estado.nuevoJugador = false;
    //Resetea el arreglo para ganar
    estado.ganar = [];

})

//Eventos que se disparan cuando la página carga
window.addEventListener('load', () => {
    // cartaVista.ocultaCartas();
    estado.puntaje = new Puntajes();
    estado.puntaje.leerStorage();
    elementos.formularioContenido[1].value = ''; 
})

//Evento que se dispara cuando le das click a los puntajes 
elementos.contenedorPuntajes.addEventListener('click', e =>{
    e.preventDefault();
    mostrarElementoPopUp(e, estado, puntajeVista);
})

//Evento que se dispara cuando le das click a los puntajes responsive
elementos.listaPuntajes[1].addEventListener('click', e => {
    e.preventDefault();
    mostrarElementoPopUp(e, estado, puntajeVista);
})

//Evento que se dispara cuando se elimina un puntaje de la lista de los mejores puntajes
elementos.contenedorPuntajes.addEventListener('click', e => {
    e.preventDefault();
    eliminarElementoPopUp(e, estado);
})

//Evento que se dispara cuando se elimina un puntaje de la lista responsive
elementos.listaPuntajes[1].addEventListener('click', e => {
    e.preventDefault();
    eliminarElementoPopUp(e, estado);
    
})

//Evento que se dispara cuando se cierra el popup
elementos.popup.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.popup__btn a')){
        //Desactiva el popup
        puntajeVista.togglePopup(0);
    }
})

//Menú responsivo
elementos.btn_responsive.addEventListener('click', () => {
    activarMenuResponsive();
    // console.log(elementos.contenedorResponsivo.childNodes);
})

//El jugador hace click en el boton de jugar responsive
elementos.contenedorResponsivo.addEventListener('click', e => {
    e.preventDefault();
    //si el target hace match con el boton jugar
    if(e.target.matches('.btn--jugar--responsive')){
        controladorJugador(jugadorVista.obtenerDatosJugadorResponsive(elementos.contenedorResponsivo.childNodes));
        //Si el nuevo jugador tiene un tiempo establecido se llama el controlador temporizador
        if(estado.inicio){
            elementos.contenedorResponsivo.style.display = 'none';
            if(estado.nuevoJugador.tiempo !== ''){
                controladorTemporizador();
            }
        }
    }
})
//Reinicia el juego Responsive
elementos.btnReiniciarResponsive.addEventListener('click', e => {
    e.preventDefault();
    estado.reiniciar();
    elementos.btnReiniciarResponsive.style.display = 'none';
    elementos.contenedorResponsivo.style.display = 'grid';
    jugadorVista.limpiarInputsResponsive(e.target);
    document.querySelector('.menu-responsivo__btn').style.display = 'inline-block';
    //desactiva el inicio del juego
    estado.inicio = false;
    //Agrega el 0 al temporizador en el DOM
    elementos.temporizadorResponsive.innerHTML = 0;
    //Pone el estado del nuevo jugaor en falso
    estado.nuevoJugador = false;
    //Resetea el arreglo para ganar
    estado.ganar = [];

})














