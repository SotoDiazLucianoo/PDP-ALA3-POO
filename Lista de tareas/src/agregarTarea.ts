import { preguntar } from './io.js';
import { Tarea, listaDeTareas, esFechaVencimientoValida, esTextoValido, existeTituloDuplicado, normalizarTexto } from './tarea.js';
import { seleccionarDificultad, seleccionarEstado } from './selecEyD.js';

export async function agregarTarea() {
    console.log('\n╔══════════════════════════════════════╗');
    console.log('║        Crear nueva tarea           ║');
    console.log('╚══════════════════════════════════════╝\n');

    let titulo = '';
    do {
        titulo = normalizarTexto(await preguntar('1. Título: '));

        if (!esTextoValido(titulo)) {
            console.log('❌ El título no puede estar vacío.');
            continue;
        }

        if (existeTituloDuplicado(titulo)) {
            console.log('⚠️ Ya existe una tarea con ese título. Intente otro.');
        }
    } while (!esTextoValido(titulo) || existeTituloDuplicado(titulo));

    let descripcion = '';
    do {
        descripcion = normalizarTexto(await preguntar('2. Descripción: '));

        if (!esTextoValido(descripcion)) {
            console.log('❌ La descripción no puede estar vacía.');
        }
    } while (!esTextoValido(descripcion));

    const estado = await seleccionarEstado();
    const dificultad = await seleccionarDificultad();

    let vencimiento = '';
    do {
        vencimiento = normalizarTexto(await preguntar('3. Fecha de vencimiento (DD/MM/AAAA): '));

        if (!esFechaVencimientoValida(vencimiento)) {
            console.log('❌ Fecha inválida. Debe usar el formato DD/MM/AAAA.');
        }
    } while (!esFechaVencimientoValida(vencimiento));

    listaDeTareas.push(new Tarea(titulo, descripcion, estado, vencimiento, dificultad));
    console.log('\n✅ Tarea creada correctamente.');
}

