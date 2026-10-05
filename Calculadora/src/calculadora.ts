export class Calculadora
{
    private num1:number = 0;
    private num2: number = 0;
    
    

    public constructor(num1: number, num2: number)
    {
        this.num1 = num1;
        this.num2 = num2;
        
    }

    public getNum1()
    {
        return this.num1;
    }

    public getNum2()
    {
        return this.num2;
    }

    public setNum1(num1 : number)
    {
        this.num1 = num1;
    }
    public setNum2(num2 : number)
    {
        this.num2 = num2;
    }
    
    public suma(): void { 
        console.log("Resultado: \n", this.num1 + this.num2);
    };

    public resta(): void { 
        console.log("Resultado: \n", this.num1 - this.num2); 
    };

    public division(): void {
        if (this.num2 !== 0) {
            console.log("Resultado: \n", this.num1 / this.num2);
        } else {
            console.log("ERROR. No se puede dividir por 0. \n");
        }
    };

    public multiplicacion(): void { 
        console.log("Resultado: \n", this.num1 * this.num2); 
    };
    

}