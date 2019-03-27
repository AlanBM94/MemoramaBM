export default class Par{
    constructor(){
        this.parArreglo = [];
    }

    //Función que agrega una carta al arreglo parArreglo
    obtenerPar(carta){
        this.parArreglo.push(carta);
    }

    //Función que comprueba que la misma carta no se repita en el arreglo parArreglo
    comprobarCarta(carta){
        return this.parArreglo.findIndex(elemento => elemento == carta) !== -1;
    }

    //Función que determina si las cartas son iguales o no
    comprobarIgualdadPar(elemento){
        return elemento.carta1 == elemento.carta2 ? true : false;
    }


}