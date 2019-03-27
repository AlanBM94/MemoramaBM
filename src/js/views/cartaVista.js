import {elementos} from './base';


//Hace que la carta gire en el DOM
export const voltearCarta = carta => {
    const cartaSel = carta.childNodes;
    cartaSel[3].style.transform = 'rotateY(-180deg)';
    cartaSel[7].style.transform = 'rotateY(0)';
}

//Muestra todas las cartas en el DOM
export const mostrarCartas = () => {
    elementos.cartas.map(elemento => {
        elemento.style.visibility = 'visible';
    })
}

//Muestra todas las cartas en su forma inicial
export const cartasVolteadas = () => {
    elementos.cartas.map(elemento => {
        elemento.childNodes[3].style.transform = 'rotateY(0deg)';
        elemento.childNodes[7].style.transform = 'rotateY(-180deg)';
    })
}

//Genera un arreglo con 10 números aleatorios del 1 al 10 sin que se repitan
const lados = () => {
    var cantidadNumeros = 10;
    var myArray = []
    while(myArray.length < cantidadNumeros ){
    var numeroAleatorio = Math.ceil(Math.random()*cantidadNumeros);
    var existe = false;
    for(var i=0;i<myArray.length;i++){
        if(myArray [i] == numeroAleatorio){
            existe = true;
            break;
        }
    }
    if(!existe) myArray[myArray.length] = numeroAleatorio;

    }
    return myArray;
}

//Ordena las imagenes de las cartas de una manera aleatoria
export const reordenarCartas = () => {
    const ladosA = lados();
    const ladosB = lados();
    const cartas = Array.from(document.querySelectorAll('.carta__lado--back'));
    cartas.map((elemento, indice)=> {
        indice <= 9 ? elemento.children[0].src = `../../img/imagen-${ladosA[indice]}.png` : elemento.children[0].src = `../../img/imagen-${ladosB[indice - 10]}.png`;
    });
}







