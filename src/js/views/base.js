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
    listaPuntajes: document.querySelector('.lista-puntajes'),
    popup: document.querySelector('.popup')
    
}

//Muestra el botón de reiniciar
export const btnReiniciar = () => {
    //Oculta el boton de jugar
    elementos.btnJugar.style.visibility = 'hidden';
    //Muestra el boton de reiniciar
    elementos.btnReiniciar.style.visibility = 'visible';
}

