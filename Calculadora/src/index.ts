import {preguntar, cerrar} from './io.js';

import { Calculadora } from './calculadora.js';

async function main()
{
    let op: number, num1:number, num2: number;
    op = 0;
    let operador : string = "";


    do
    {
        console.log("0.Para salir del menu.\n");
        console.log("1. Para realizar una operacion (suma, resta, division, multiplicacion).\n");
        
        op = parseInt(await preguntar("Ingrese la opcion:"),10);
            while(Number.isNaN(op) || op<0 || op>1)
            {
                console.log("ERROR. Debe ingresar un numero o una opcion. \n");
                op = parseInt(await preguntar("Ingrese la opcion:"),10);
            }
        
        switch(op)
        {
            case 1:

                operador = await preguntar("Ingrese el operador de la operacion que desea realizar (+, -, /, *): \n");
                num1 = parseFloat(await preguntar("Ingrese el primer numero: \n"));
                num2 = parseFloat(await preguntar("Ingrese el segundo numero: \n"));

                    while(Number.isNaN(num1) || Number.isNaN(num2))
                    {
                        console.log("ERROR. Numero invalido, vuelva a intentarlo: \n");
                        num1 = parseFloat(await preguntar("Ingrese el primer numero: \n"));
                        num2 = parseFloat(await preguntar("Ingrese el segundo numero: \n"));

                    }
                
                switch(operador)
                {
                    case "+":
                        let suma = new Calculadora(num1, num2);
                        suma.suma();
                    break;
                    case "-":
                        let resta = new Calculadora (num1, num2);
                        resta.resta();
                    break;
                    case "*":
                        let multiplicacion= new Calculadora (num1, num2);
                        multiplicacion.multiplicacion();
                    break;
                    case "/":
                        let division = new Calculadora (num1, num2);
                        division.division();

                    break;
                }
        }
        
    
    
    }while(op!=0);

cerrar();
}

main();