import {preguntar} from "./io.js";
import { facil, medio, dificil, pendiente, enCurso, terminada, cancelada } from "./tarea.js";

export async function seleccionarDificultad() {
    
    let opcion = parseInt(await preguntar("Dificultad [1] Fácil [2] Medio [3] Difícil:"), 10);

    while (Number.isNaN(opcion) || opcion < 1 || opcion > 3) {
        console.log("ERROR. Opcion incorrecta! Vuelva a intentarlo:");
        // mejor volver a pedir con prompt claro
        opcion = parseInt(await preguntar("Dificultad [1] Fácil [2] Medio [3] Difícil:"), 10);
    }

    switch (opcion) {
        case 1: return facil;
        case 2: return medio;
        case 3: return dificil;
        default: return facil;
    }
}

export async function seleccionarEstado()
{
    let opcion = parseInt(await preguntar("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada):"), 10);
    
        while(Number.isNaN(opcion) || opcion <1 || opcion>4)
        {
            console.log("ERROR. Opcion incorrecta! Vuelva a intentarlo: \n");
            opcion = parseInt(await preguntar("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada):"), 10);
        }

        switch(opcion)
        {
            case 1:
                return pendiente;
            case 2:
                return enCurso;
            case 3:
                return terminada;
            case 4:
                return cancelada;

            default: return pendiente;
        }
}