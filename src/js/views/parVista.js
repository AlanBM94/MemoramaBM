//Función que muestra que imagenes tienen las cartas seleccionadas
const obtenerImagenes = (carta) => {
    return document.querySelector(`#${carta}`).childNodes[7].children[0].attributes[0].nodeValue;
}

//Función que voltea la carta del lado frontal
const volteaCartaFrontal = (ladoA) => {
    ladoA.childNodes[3].style.transform = 'rotateY(0deg)';
}

//Función que voltea la carta del lado trasero 
const volteaCartaTrasera = (ladoB) => {
    ladoB.childNodes[7].style.transform = 'rotateY(-180deg)'; 
}

//Función que comprueba que las imagenes sean iguales
export const comprobarParIgual = (carta1, carta2) => {
    const obj = {
        'carta1' : obtenerImagenes(carta1),
        'carta2': obtenerImagenes(carta2)
    }
    return obj;
}   

//Función que gira las cartas que no son un par igual
export const voltearCartas = par => {
    volteaCartaFrontal(document.querySelector(`#${par[0]}`))
    volteaCartaTrasera(document.querySelector(`#${par[0]}`))
    volteaCartaFrontal(document.querySelector(`#${par[1]}`))
    volteaCartaTrasera(document.querySelector(`#${par[1]}`))
}