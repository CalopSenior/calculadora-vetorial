//criar novos vetores
class Vector {
    constructor(x, y, z){
        if(isNaN(x * y * z) === true){
            throw new Error("Os valores devem estar todos preenchidos")
        }
        this.x = precision(x);
        this.y = precision(y);
        this.z = precision(z);
    }

    module(){
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    };
    versor(){
        return new Vector(
            this.x/this.module(),
            this.y/this.module(),
            this.z/this.module()
        );
    };
    dot(k = 1){
        return new Vector(
            this.x * k,
            this.y * k,
            this.z * k
        );
    };
    arr(){
        return [this.x, this.y, this.z]
    };
    str(){
        return `${this.x}i ${this.y < 0 ? "-" : "+"} ${Math.abs(this.y)}j ${this.z < 0 ? "-" : "+"} ${Math.abs(this.z)}k`
    }
};

//base canônica e lista de vetores
const i = new Vector(1,0,0);
const j = new Vector(0,1,0);
const k = new Vector(0,0,1);
const vectors = {};

//conversor de fração
const frac = (n) => {
    //retorna se for inteiro
    if(Number.isInteger(n)) return n;

    //obtém o número de casas decimais
    const p = n.toString().split('.')[1].length;

    //denominador é 10 elevado ao número de casas decimais
    const denominator = 10 ** p;

    //numerador é o número decimal multiplicado pelo denominador
    const numerator = n * denominator;

    //função auxiliar para calcular o máximo divisor comum (MDC) usando o algoritmo de Euclides
    const mcd = (a, b) => (b ? mcd(b, a % b) : a);

    //simplifica o numerador e o denominador pelo MDC
    const commonDivisor = mcd(numerator, denominator);
    const simplifiedNumerator = numerator / commonDivisor;
    const simplifiedDenominator = denominator / commonDivisor;

    //retorna a fração simplificada
    return `${simplifiedNumerator}/${simplifiedDenominator}`;
};

//funções para operações com vetores
const sum = (v0, v1) =>{ //soma de vetores
    return new Vector( //retorna o vetor resultante
        v0.x + v1.x,
        v0.y + v1.y,
        v0.z + v1.z
    );
};
const colinear = (v0, v1) =>{ //verifica se dois vetores são colineares
    const vt = simplifyArr(crossProduct(v0, v1).arr());
    if(vt[0] === 0 && vt.length === 1){
        return true
    }
    return false;
}
const dotProduct = (v0, v1) =>{ //produto escalar
    return (v0.x * v1.x) + (v0.y * v1.y) + (v0.z * v1.z);
};
const crossProduct = (v0, v1) =>{ //produto vetorial
    return new Vector( //retorna o vetor resultante
        v0.y * v1.z - v0.z * v1.y,
        v0.z * v1.x - v0.x * v1.z,
        v0.x * v1.y - v0.y * v1.x
    );
};