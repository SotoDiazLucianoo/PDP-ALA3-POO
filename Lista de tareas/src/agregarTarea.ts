import {preguntar} from './io.js';
import { Tarea, listaDeTareas} from './tarea.js';
import { seleccionarDificultad, seleccionarEstado } from './selecEyD.js';


export async function agregarTarea() {
    
    console.log(`Estas creando una nueva tarea.`);


    let titulo = await preguntar("1.Ingrese el titulo:");
    while (titulo.length <= 0) {
        console.log("ERROR. Debe ingresar al menos un caracter. Vuelva a intentarlo: \n");
        titulo = await preguntar("1.Ingrese el titulo:");
    }

    let descripcion = await preguntar("2. Ingrese la descripcion:");
    while (descripcion.length <= 0) {
        console.log("ERROR. Debe ingresar al menos un caracter. Vuelva a intentarlo: \n");
        descripcion = await preguntar("2. Ingrese la descripcion:");
    }

    let estado = await seleccionarEstado();

    let dificultad = await seleccionarDificultad();

    let vencimiento = await preguntar("Fecha de vencimiento DD/MM/AAAA: ");


    listaDeTareas.push(new Tarea(titulo, descripcion, estado, vencimiento, dificultad));
    console.log('¡✅ Datos guardados!.');
    
}

