export const elementos = {
    btnJugar: document.querySelector('.btn--jugar'),
    btnReiniciar: document.querySelector('.btn--jugar--2'),
    formulario: document.querySelector('.formulario'),
    formularioContenido: [
        document.querySelector('.formulario__nombre'),
        document.querySelector('.formulario__tiempo select')
    ],
    temporizador: document.querySelector('.temporizador'),
    contenedorCartas: document.querySelector('.contenedor-central__contenedor-cartas'),
    cartas: [
        document.querySelector('#cartaBtn-1'),
        document.querySelector('#cartaBtn-2'),
        document.querySelector('#cartaBtn-3'),
        document.querySelector('#cartaBtn-4'),
        document.querySelector('#cartaBtn-5'),
        document.querySelector('#cartaBtn-6'),
        document.querySelector('#cartaBtn-7'),
        document.querySelector('#cartaBtn-8'),
        document.querySelector('#cartaBtn-9'),
        document.querySelector('#cartaBtn-10'),
        document.querySelector('#cartaBtn-11'),
        document.querySelector('#cartaBtn-12'),
        document.querySelector('#cartaBtn-13'),
        document.querySelector('#cartaBtn-14'),
        document.querySelector('#cartaBtn-15'),
        document.querySelector('#cartaBtn-16'),
        document.querySelector('#cartaBtn-17'),
        document.querySelector('#cartaBtn-18'),
        document.querySelector('#cartaBtn-19'),
        document.querySelector('#cartaBtn-20'),
    ],
    contenedorPuntajes: document.querySelector('.contenedor-puntajes'),
    listaPuntajes: Array.from(document.querySelectorAll('.lista-puntajes')),
    popup: document.querySelector('.popup'),
    btn_responsive: document.querySelector('.menu-responsivo__icono'),
    contenedorResponsivo: document.querySelector('.menu-responsivo__contenedor'),
    temporizadorResponsive: document.querySelector('.temporizador--responsive'),
    btnReiniciarResponsive: document.querySelector('.btn--reiniciar--responsive')
    
}

//Muestra el botón de reiniciar
export const btnReiniciar = () => {
    //Oculta el boton de jugar
    elementos.btnJugar.style.visibility = 'hidden';
    //Muestra el boton de reiniciar
    elementos.btnReiniciar.style.visibility = 'visible';
}

const limpiaContenedor = () => {
    const contenedor = document.querySelector('.menu-responsivo__contenedor');
    contenedor.innerHTML = '';
}

//Muestra el menú responsive
export const activarMenuResponsive = () => {
    limpiaContenedor();
    const contenedor = document.querySelector('.menu-responsivo__contenedor');
    const markup = `
    <input type="text" class="formulario__nombre formulario__nombre--responsive" placeholder="nombre">
    <div class="formulario__tiempo formulario__tiempo--responsive">
        <select name="tiempo" id="" class="formulario__tiempo--responsive__select">
            <option value="1">1s</option>
            <option value="30">30s</option>
            <option value="40">40s</option>
            <option value="50">50s</option>
            <option value="60">60s</option>
        </select>
    </div>
    <button class="btn btn--jugar btn--jugar--responsive">jugar</button>
    `;
    contenedor.insertAdjacentHTML('beforeend', markup);
}

//Muestra el btn responsivo de reiniciar
export const btnResponsivo = () => {
    document.querySelector('.menu-responsivo__btn').style.display = 'none';
    document.querySelector('.btn--reiniciar').style.display = 'block';

}

//Función que muestra los elementos del popup
export const mostrarElementoPopUp = (e, estado, puntajeVista)=> {
    if(e.target.matches('.lista-puntajes__items--ver')){
        const id = e.target.parentElement.id.split('-');
        //Muestra el popup con la información del jugador en el que se dio click
        const puntajeIndice = estado.puntaje.leerStorage().findIndex(elemento => {
            if(elemento.fecha == id[0] && elemento.hora == id[1]){
                return elemento;
            }
        })
        //Leé el jugador del LS
        puntajeVista.mostrarDetalles(estado.puntaje.leerStorage()[puntajeIndice]);
        //Activa el popup
        puntajeVista.togglePopup(1);
    }
}

//Función que elimina los elementos del popup
export const eliminarElementoPopUp = (e, estado) => {
    if(e.target.matches('.lista-puntajes__items--eliminar')){
        const item = e.target.parentElement;
        //Elimina el jugador del DOM
        item.parentElement.removeChild(item);
        //Elimina el jugador de local storage
        estado.puntaje.deleteStorage(item.id);
    }
}


