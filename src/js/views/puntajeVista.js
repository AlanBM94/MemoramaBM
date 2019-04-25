import {elementos} from './base';

//Limpia los puntajes del DOM
export const limpiarPuntajes = () => {
    elementos.listaPuntajes.map(elemento => {
        elemento.innerHTML = '';
    })

}

//Muestra el puntaje en el DOM
export const mostrarPuntajes = jugador => {
    const markup = `
    <li class="lista-puntajes__items" id="${jugador.fecha}-${jugador.hora}">${jugador.nombre}-<span>${jugador.puntaje}</span><a class="lista-puntajes__items--ver" href="#popup">&#9737;</a><a class="lista-puntajes__items--eliminar" href="#">&#215;</a></li>
    `;
    elementos.listaPuntajes.map(elemento => {
        elemento.insertAdjacentHTML('beforeend', markup)
    })
}
//Muestra los detalles en el popup de el jugador
export const mostrarDetalles = jugador => {
    const markup = `
    <div class="popup__btn">
        <a href="#main">X</a>
    </div>
    <div class="popup__content">
        <div class="popup__titulo">
            <h3 class="titulo">Información del jugador</h3>
        </div>
        <div class="popup__info">
            <ul class="info">
                <li class="info__items">Nombre del jugador: <span>${jugador.nombre}</span></li>
                <li class="info__items">Tiempo record: <span>${jugador.tiempoRecord}s</span></li>
                <li class="info__items">Puntaje: <span>${jugador.puntaje}</span></li>
                <li class="info__items">Fecha de la partida: <span>${jugador.fecha}</span></li>
                <li class="info__items">Hora de la partida: <span>${jugador.hora}</span></li>
            </ul>
        </div>
    </div>
    
    `;
    elementos.popup.innerHTML = markup;
}

//Activa y desactiva el popup
export const togglePopup = btn => {
    if(btn == 1){
        document.querySelector('.popup').style.opacity = '1';
        document.querySelector('.popup').style.visibility = 'visible';
        document.querySelector('.popup__content').style.opacity = '1';
    }else {
        document.querySelector('.popup').style.opacity = '0';
        document.querySelector('.popup').style.visibility = 'hidden';
        document.querySelector('.popup__content').style.opacity = '0';
    }
}

// <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->