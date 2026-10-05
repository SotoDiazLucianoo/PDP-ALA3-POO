import { preguntar } from "./io.js";
import { seleccionarDificultad, seleccionarEstado } from './selecEyD.js'; 

type TaskState = '❗ Pendiente' | '🛠 En curso' | '✔ Terminada' | "❌ Cancelada";
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

export const listaDeTareas: any[] = [];
export const pendiente: TaskState = '❗ Pendiente';
export const enCurso: TaskState = '🛠 En curso';
export const terminada: TaskState = '✔ Terminada';
export const cancelada: TaskState = "❌ Cancelada";
export const facil: TaskDifficulty = '⭐';
export const medio: TaskDifficulty = '⭐⭐';
export const dificil: TaskDifficulty = '⭐⭐⭐';


export const Tarea = function(this: any, titulo: string, descripcion: string, estado: TaskState, vencimiento: string, dificultad: TaskDifficulty) {
    this.id = listaDeTareas.length + 1;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.vencimiento = vencimiento;
    this.dificultad = dificultad;
    this.fechaCreacion = new Date().toLocaleDateString();
} as any;



Tarea.prototype.setDescripcion = async function(this: Task) {
    
    this.descripcion = await preguntar("Ingrese la nueva descripcion: ");
    console.log('¡✅ Descripción guardada!');
};

Tarea.prototype.setEstado = async function(this: Task) {
    this.estado = await seleccionarEstado(); 
    console.log('¡✅ Estado guardado!');
};


Tarea.prototype.setDificultad = async function(this: Task) {
    this.dificultad = await seleccionarDificultad();
    console.log('¡✅ Dificultad guardada!');
};


Tarea.prototype.setVencimiento = async function(this: Task) {
    this.vencimiento = await preguntar("Ingrese el vencimiento DD/MM/AAAA:");
    console.log('¡✅ Vencimiento guardado!');
};