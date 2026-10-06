import { preguntar } from "./io.js";
import { seleccionarDificultad, seleccionarEstado } from './selecEyD.js';

type TaskState = '❗ Pendiente' | '🛠 En curso' | '✔ Terminada' | '❌ Cancelada';
type TaskDifficulty = '⭐' | '⭐⭐' | '⭐⭐⭐';

export interface Task {
    id: number;
    titulo: string;
    descripcion: string;
    estado: TaskState;
    vencimiento: string;
    dificultad: TaskDifficulty;
    fechaCreacion: string;
}

export type EditableTask = Task & {
    setDescripcion: () => Promise<void>;
    setEstado: () => Promise<void>;
    setDificultad: () => Promise<void>;
    setVencimiento: () => Promise<void>;
};

export const listaDeTareas: Task[] = [];
export const pendiente: TaskState = '❗ Pendiente';
export const enCurso: TaskState = '🛠 En curso';
export const terminada: TaskState = '✔ Terminada';
export const cancelada: TaskState = '❌ Cancelada';
export const facil: TaskDifficulty = '⭐';
export const medio: TaskDifficulty = '⭐⭐';
export const dificil: TaskDifficulty = '⭐⭐⭐';

export function normalizarTexto(valor: string): string {
    return valor.replace(/\s+/g, ' ').trim();
}

export function esTextoValido(valor: string): boolean {
    return normalizarTexto(valor).length > 0;
}

export function esFechaVencimientoValida(fecha: string): boolean {
    const valor = normalizarTexto(fecha);

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
        return false;
    }

    const [diaStr, mesStr, anioStr] = valor.split('/');

    if (!diaStr || !mesStr || !anioStr) {
        return false;
    }

    const dia = Number(diaStr);
    const mes = Number(mesStr);
    const anio = Number(anioStr);

    if (!Number.isInteger(dia) || !Number.isInteger(mes) || !Number.isInteger(anio)) {
        return false;
    }

    const fechaValida = new Date(anio, mes - 1, dia);

    return fechaValida.getFullYear() === anio
        && fechaValida.getMonth() === mes - 1
        && fechaValida.getDate() === dia;
}

export function existeTituloDuplicado(titulo: string): boolean {
    const valor = normalizarTexto(titulo).toLowerCase();

    return listaDeTareas.some((tarea) => {
        return normalizarTexto(tarea.titulo).toLowerCase() === valor;
    });
}

export const Tarea = function(this: any, titulo: string, descripcion: string, estado: TaskState, vencimiento: string, dificultad: TaskDifficulty) {
    this.id = listaDeTareas.length + 1;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.vencimiento = vencimiento;
    this.dificultad = dificultad;
    this.fechaCreacion = new Date().toLocaleDateString('es-AR');
} as any;

Tarea.prototype.setDescripcion = async function(this: Task) {
    let descripcion = '';

    do {
        descripcion = normalizarTexto(await preguntar('Nueva descripción: '));

        if (!descripcion) {
            console.log('❌ La descripción no puede quedar vacía.');
        }
    } while (!descripcion);

    this.descripcion = descripcion;
    console.log('✅ Descripción guardada.');
};

Tarea.prototype.setEstado = async function(this: Task) {
    this.estado = await seleccionarEstado();
    console.log('✅ Estado guardado.');
};

Tarea.prototype.setDificultad = async function(this: Task) {
    this.dificultad = await seleccionarDificultad();
    console.log('✅ Dificultad guardada.');
};

Tarea.prototype.setVencimiento = async function(this: Task) {
    let vencimiento = '';

    do {
        vencimiento = normalizarTexto(await preguntar('Ingrese el vencimiento DD/MM/AAAA: '));

        if (!esFechaVencimientoValida(vencimiento)) {
            console.log('❌ Formato inválido. Debe ser DD/MM/AAAA.');
        }
    } while (!esFechaVencimientoValida(vencimiento));

    this.vencimiento = vencimiento;
    console.log('✅ Vencimiento guardado.');
};