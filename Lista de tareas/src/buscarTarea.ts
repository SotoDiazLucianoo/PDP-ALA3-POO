import { preguntar } from './io.js';
import { listaDeTareas, normalizarTexto } from './tarea.js';
import { verTareaEspecifica } from './mostrarTareas.js';

export async function buscarTarea() {
    if (listaDeTareas.length === 0) {
        console.log('❌ Debes crear al menos una tarea antes de buscar.');
        return;
    }

    let tituloBuscado = '';
    let tareaBuscada;

    do {
        tituloBuscado = normalizarTexto(await preguntar('🔎 Ingresa el título de la tarea: '));

        if (!tituloBuscado) {
            console.log('❌ El título no puede estar vacío.');
            continue;
        }

        tareaBuscada = listaDeTareas.find((tarea) => {
            return normalizarTexto(String(tarea.titulo)).toLowerCase() === tituloBuscado.toLowerCase();
        });

        if (!tareaBuscada) {
            console.log('No se encontraron tareas con ese título. Intenta otra búsqueda.');
        }
    } while (!tareaBuscada);

    console.log('\n✅ Tarea encontrada:');
    console.log(`${tareaBuscada.id} - ${tareaBuscada.titulo}\n`);

    await verTareaEspecifica();
}
