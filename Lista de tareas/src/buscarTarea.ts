import { preguntar } from "./io.js";
import { listaDeTareas } from "./tarea.js";
import {verTareaEspecifica} from "./mostrarTareas.js"

export async function buscarTarea() {

    let tituloBuscado: string = "";

    if(listaDeTareas.length === 0)
    {
        console.log("ERROR. Debe ingresar al menos una tarea. \n");
        return;
    }
    else
    {

        tituloBuscado = await preguntar("Introduce el titulo de una Tarea para buscarla:")
        
        let tareaBuscada = listaDeTareas.find(tarea => String(tarea.titulo) === tituloBuscado);

        while(!tareaBuscada)
        {
            console.log("No hay tareas relacionadas con la busqueda. Vuelva a intentarlo");
            tituloBuscado = await preguntar("Introduce el titulo de una Tarea para buscarla:");
            tareaBuscada = listaDeTareas.find(tarea => String(tarea.titulo) === tituloBuscado);
        }

        console.log("Estas son las tareas relacionadas: \n\n");

        console.log(`${tareaBuscada.id} ${tareaBuscada.titulo} \n\n`);
        
        await verTareaEspecifica();
    }

}
