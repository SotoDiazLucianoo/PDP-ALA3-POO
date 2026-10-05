import {preguntar} from './io.js';
import { listaDeTareas } from './tarea.js';


export async function modificarTarea(tituloTarea: string, idTarea: number){

    let op: number = 0;
    do
    {

        console.log('Estas editando la tarea ', tituloTarea);
        
        console.log(`
            ===================================
            ¿Que deseas modificar?
            [1] Descripcion.
            [2] Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada).
            [3] Dificultad [1] Fácil [2] Medio [3] Difícil.
            [4] Vencimiento.
            [0] Salir.

            Nota: si deseas dejar en blanco un atributo, escribe un espacio y presiona Enter.
            ===================================`);

            op = parseInt(await preguntar("Ingrese una opcion:"), 10);

            while(Number.isNaN(op) || op<0 || op>4)
            {
                console.log("ERROR. Opcion incorrecta, vuelva a intentarlo: \n");
                op = parseInt(await preguntar("Ingrese la opción: "), 10);

            }

            let tareaEditada = listaDeTareas.find( tarea => Number(tarea.id) === idTarea);

            if (!tareaEditada) {
                console.log("❌ No se encontró la tarea.");
                return; 
            }

            switch(op)
            {
                
                case 1:

                    await tareaEditada.setDescripcion();
                    console.log('¡✅ Datos guardados!.');
                break;
                case 2:

                    await tareaEditada.setEstado();
                    console.log('¡✅ Datos guardados!.');
                break;
                case 3:

                    await tareaEditada.setDificultad();
                    console.log('¡✅ Datos guardados!.');
                break;
                case 4:

                    await tareaEditada.setVencimiento();
                    console.log('¡✅ Datos guardados!.');

                break;
            }
    }while(op!=0);

}