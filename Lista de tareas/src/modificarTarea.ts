import { preguntar } from './io.js';
import { listaDeTareas } from './tarea.js';
import type { EditableTask } from './tarea.js';

export async function modificarTarea(tituloTarea: string, idTarea: number) {
    let op = 0;

    do {
        console.log(`\n╔══════════════════════════════════════════════╗`);
        console.log(`║       Editando tarea: ${tituloTarea.padEnd(20).slice(0, 20)} ║`);
        console.log(`╠══════════════════════════════════════════════╣`);
        console.log(`║ [1] Descripción                            ║`);
        console.log(`║ [2] Estado                                 ║`);
        console.log(`║ [3] Dificultad                             ║`);
        console.log(`║ [4] Vencimiento                            ║`);
        console.log(`║ [0] Volver                                 ║`);
        console.log(`╚══════════════════════════════════════════════╝`);

        op = parseInt(await preguntar('👉 Elige una opción: '), 10);

        while (Number.isNaN(op) || op < 0 || op > 4) {
            console.log('❌ Opción inválida. Debe elegir un número del 0 al 4.');
            op = parseInt(await preguntar('👉 Elige una opción: '), 10);
        }

        const tareaEditada = listaDeTareas.find((tarea) => Number(tarea.id) === idTarea) as EditableTask | undefined;

        if (!tareaEditada) {
            console.log('❌ No se encontró la tarea.');
            return;
        }

        switch (op) {
            case 1:
                await tareaEditada.setDescripcion();
                break;
            case 2:
                await tareaEditada.setEstado();
                break;
            case 3:
                await tareaEditada.setDificultad();
                break;
            case 4:
                await tareaEditada.setVencimiento();
                break;
        }
    } while (op !== 0);
}