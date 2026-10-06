import { preguntar, cerrar } from './io.js';
import { pendiente, enCurso, terminada } from './tarea.js';
import { agregarTarea } from './agregarTarea.js';
import { mostrarTareas } from './mostrarTareas.js';
import { buscarTarea } from './buscarTarea.js';

function mostrarMenuPrincipal() {
    console.log(`
╔══════════════════════════════════════════════╗
║        📋 GESTOR DE TAREAS 📋             ║
╠══════════════════════════════════════════════╣
║  [1] Ver tareas                            ║
║  [2] Buscar tarea                         ║
║  [3] Agregar tarea                        ║
║  [0] Salir                                ║
╚══════════════════════════════════════════════╝`);
}

function mostrarMenuFiltro() {
    console.log(`
╔══════════════════════════════════════════════╗
║        ¿Qué tareas quieres ver?            ║
╠══════════════════════════════════════════════╣
║  [1] Todas                                ║
║  [2] Pendientes                           ║
║  [3] En curso                             ║
║  [4] Terminadas                            ║
║  [0] Volver                               ║
╚══════════════════════════════════════════════╝`);
}

async function main() {
    let op: number;
    let filtro = 0;
    let opcion = 0;
    let filtroEspecifico = '';

    do {
        mostrarMenuPrincipal();
        op = parseInt(await preguntar('👉 Elige una opción: '), 10);

        while (Number.isNaN(op) || op < 0 || op > 3) {
            console.log('❌ Opción inválida. Debe elegir un número del 0 al 3.');
            op = parseInt(await preguntar('👉 Elige una opción: '), 10);
        }

        switch (op) {
            case 1:
                mostrarMenuFiltro();
                opcion = parseInt(await preguntar('👉 Elige una opción: '), 10);

                while (Number.isNaN(opcion) || opcion < 0 || opcion > 4) {
                    console.log('❌ Opción inválida. Debe elegir un número del 0 al 4.');
                    opcion = parseInt(await preguntar('👉 Elige una opción: '), 10);
                }

                switch (opcion) {
                    case 1:
                        filtro = 1;
                        await mostrarTareas(filtro, '');
                        break;
                    case 2:
                        filtroEspecifico = '❗ Pendiente';
                        await mostrarTareas(filtro, pendiente);
                        break;
                    case 3:
                        filtroEspecifico = '🛠 En curso';
                        await mostrarTareas(filtro, enCurso);
                        break;
                    case 4:
                        filtroEspecifico = '✔ Terminada';
                        await mostrarTareas(filtro, terminada);
                        break;
                }
                break;

            case 2:
                await buscarTarea();
                break;

            case 3:
                await agregarTarea();
                break;
        }
    } while (op !== 0);

    console.log('\n👋 ¡Hasta luego!');
    cerrar();
}

main();
