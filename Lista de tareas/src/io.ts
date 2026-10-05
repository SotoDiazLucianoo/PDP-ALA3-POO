import readline from "readline";

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Función para hacer una pregunta y esperar la respuesta
export function preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta: string) => {
        resolve(respuesta);
        });
});
}

// Función para cerrar la interfaz
export const cerrar = (): void => rl.close();
