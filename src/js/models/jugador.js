export default class Jugador{
    constructor(nombre, tiempo){
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.fecha = new Date();
    }

    tiempoPartida(tiempo){
        this.tiempoRecord = (tiempo.tiempoInicial - tiempo.tiempoFinal);
    }

    obtenerPuntaje(tiempo){
        this.puntaje = (60 - (tiempo.tiempoInicial - tiempo.tiempoFinal)) * 1000  ;
    }

    organizarFecha(){
        //Asigna el nombre del mes al número del mes
        const mesNombre = mes => {
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            return meses[mes];
        }
        //Le da formato de un reloj a la hora
        const horaReloj = (hora) => {
            if(hora.horas < 10) hora.horas = `0${hora.horas}`
            if(hora.minutos < 10) hora.minutos = `0${hora.minutos}`
            if(hora.segundos < 10) hora.segundos = `0${hora.segundos}`
            return hora;
        }

        this.fecha = {
            'dia': this.fecha.getDate(),
            'mes': mesNombre(this.fecha.getMonth()),
            'año': this.fecha.getFullYear(),
            'hora': horaReloj({
                'horas': this.fecha.getHours(),
                'minutos': this.fecha.getMinutes(),
                'segundos': this.fecha.getSeconds()
            })    
        }
        //Asigna la hora a la clae jugador
        this.hora = `${this.fecha.hora.horas}:${this.fecha.hora.minutos}:${this.fecha.hora.segundos}`;
        //Asigna la fecha a la clae jugador
        this.fecha = `${this.fecha.dia} de ${this.fecha.mes} del ${this.fecha.año}`;
        
    }


    
}