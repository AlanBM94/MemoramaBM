export default class Puntajes {
    constructor(){
        this.jugadores = [];
    }

    //Agrega el jugador al arreglo de puntajes
    agregarJugador(jugadorNuevo){
        const jugador = {
            'nombre': jugadorNuevo.nombre,
            'tiempoRecord': jugadorNuevo.tiempoRecord,
            'puntaje': jugadorNuevo.puntaje,
            'fecha': jugadorNuevo.fecha,
            'hora': jugadorNuevo.hora
        }
        this.jugadores.push(jugador);
        this.jugadoresStorage();
        return jugador;
    }

    //Agrega los jugadores a Local Storage
    jugadoresStorage(){
        localStorage.setItem('Jugadores', JSON.stringify(this.jugadores));
    }
    
    
    jugadorRepetido(fecha){
        return this.jugadores.findIndex(elemento => elemento.fecha == fecha) !== -1;
    }

    //Leé el Local Storage
    leerStorage(){
        const storage = JSON.parse(localStorage.getItem('Jugadores'));
        if(storage) this.jugadores = storage;
        return storage;
    }
    

    //Ordenar el arreglo empezando por el puntaje más alto
    ordenarArreglo(jugadores){
        return jugadores.sort((a, b) => a.puntaje - b.puntaje).reverse().slice(0, 5);
    }

    //Elimina un elemento de local Storage
    deleteStorage(id){
        id = id.split('-');
        const index = this.jugadores.findIndex(elemento => {
            if(elemento.fecha == id[0] && elemento.hora == id[1]){
                return elemento;
            }
        });
        this.jugadores.splice(index, 1);
        this.jugadoresStorage();
    }

}