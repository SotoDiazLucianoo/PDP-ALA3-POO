import {preguntar} from './io.js';
import { listaDeTareas} from './tarea.js';
import { modificarTarea } from './modificarTarea.js';



export async function mostrarTareas(filtroTodas: number, filtroEspecifico: string)
{
    
    if(listaDeTareas.length === 0)
    {
        console.log("ERROR. Debe agregar al menos una tarea. \n");
    }
    else
    {
        if(filtroTodas === 1)
        {
            console.log("Estas son todas tus tareas.")

            for(const tarea of listaDeTareas)
            {
                
                console.log(`${tarea.id} ${tarea.titulo}\n`); 
                
                
            }
            
            
            await verTareaEspecifica();
        }
        else
        {
            console.log("Estas son todas tus tareas.")

            for(const tarea of listaDeTareas)
            {
                if(tarea.estado === filtroEspecifico)
                {
                    console.log(`${tarea.id} ${tarea.titulo}\n\n`);
                }

            }
            
            await verTareaEspecifica();
        } 
    }
}


export async function verTareaEspecifica()
{
    let idIngresado: number = 0, opcion: number = 0;

    console.log(`
            ¿Deseas ver los detalles de alguna?
            Introduce el numero para verla o 0 para volver.
            `);

                idIngresado = parseInt(await preguntar("Numero: "),10);
                    if(idIngresado === 0)
                    {
                        return;
                    }else
                    {

                            let tareaElegida = listaDeTareas.find(tarea =>Number(tarea.id) === idIngresado );

                            while(!tareaElegida)
                            {
                                console.log("ERROR. Ese numero no existe, vuelva a intentarlo: \n");
                                idIngresado = parseInt(await preguntar("Numero: "),10);
                                if(idIngresado === 0)
                                {
                                    return;
                                }
                                
                                tareaElegida = listaDeTareas.find(tarea =>Number(tarea.id) === idIngresado);
                            }

                            console.log('Esta es la tarea que elegiste.\n');

                            console.log(tareaElegida.titulo),"\n";
                            console.log(tareaElegida.descripcion, "\n");
                            console.log("Estado: ", tareaElegida.estado, "\n");
                            console.log("Dificultad: ", tareaElegida.dificultad, "\n");
                            console.log("Vencimiento: ", tareaElegida.vencimiento, "\n");
                            console.log("Creacion: ", tareaElegida.fechaCreacion, "\n\n");

                            console.log("Si deseas editarla, presiona 1, o presiona 0 para volver.\n");

                            opcion = parseInt(await preguntar("Ingrese una opcion:"),10);
                                while(Number.isNaN(opcion) || opcion<0 || opcion>1)
                                {
                                    console.log("ERROR. Esa opcion no existe, vuelva a intentarlo: \n");
                                    opcion = parseInt(await preguntar("Ingrese una opcion:"),10);
                                }
                            if(opcion === 0)
                            {
                                return;
                            }
                            else
                            {
                                await modificarTarea(tareaElegida.titulo, tareaElegida.id);
                            }
                    }
}

