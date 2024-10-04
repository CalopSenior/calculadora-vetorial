//adiciona o comportamento para alterar valor de inputs com o scroll
document.querySelectorAll("input[type='number']").forEach(el =>{
    el.addEventListener("wheel", (event) =>{
        event.preventDefault();
        const target = event.target;
        if(target.readOnly) return; //impede que campos com "readonly" tenham valores alterados
        const step = Number(el.step) || 1;
        let v = Number(el.value);

        if(event.deltaY < 0) {
            v += step;  //scroll para cima
        } else {
            v -= step;  //scroll para baixo
        }
        if(target.min && v < target.min){
            v = target.min;
        } else if(target.max && v > target.max){
            v = target.max;
        }
        el.value = v;
    })
});

//adiciona a lógica para criar vetores
document.getElementById("bcv").addEventListener("click",() =>{
    try {
        vectors["V" + Object.keys(vectors).length] = new Vector(
        parseFloat(document.getElementById("xv").value),
        parseFloat(document.getElementById("yv").value),
        parseFloat(document.getElementById("zv").value)
    );
    writeVector(vectors["V" + (Object.keys(vectors).length - 1)]); //permite a seleção do vetor pelo usuário
    document.querySelectorAll(".ops").forEach(el => el.max = Object.keys(vectors).length - 1); //altera o maior índice de vetor selecionavél
    } catch (error) {
        alert(error.message)
    };
});

//função que printa o vetor na UI
const writeVector = (vector) =>{
    const vi = Object.values(vectors).indexOf(vector); //index do vetor
    
    //criar o elemento <label>
    const lb = document.createElement('label');
    lb.setAttribute('for', `v${vi}`);

    //criar o <input type="checkbox">
    const cb = document.createElement('input');
    cb.setAttribute('type', 'checkbox');
    cb.setAttribute('name', `v${vi}`);
    cb.setAttribute('id', `v${vi}`);

    //criar o <b>V<sub>0</sub>=</b>
    const vb = document.createElement('b');
    vb.innerHTML = `V<sub>${vi}</sub>=`;

    //criar o <p>(x, y, z)</p>
    const vp = document.createElement('p');
    vp.textContent = `(${vector.x}, ${vector.y}, ${vector.z})`;

    //anexar o checkbox, b e p ao label
    lb.appendChild(cb);
    lb.appendChild(vb);
    lb.appendChild(vp);

    document.getElementById("vectorTable").appendChild(lb); //adiciona o vetor na tabela de vetores
};

const simplifyArr = arr => [...new Set(arr)]; //função que remove valores duplicados de arrays
const precision = (n) =>{ //função que melhora a legibilidade dos valores numéricos
    return Math.abs(n) < 1e-4 ? 0 : +n.toFixed(5)
};

//configuração dos botões para as operações
document.getElementById("module").addEventListener("click",({target}) =>{ //operação de módulo
    const vector = "V" + document.getElementById("opm").value;
    if(vectors[vector]){
        document.getElementById("rm").value = precision(vectors[vector].module());
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para o vetor ${vector}`);
});

document.getElementById("versor").addEventListener("click",({target}) =>{ //operação de vetor unitário
    const vector = "V" + document.getElementById("opu").value;
    if(vectors[vector]){
        document.getElementById("ru").value = vectors[vector].versor().str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para o vetor ${vector}`);
});

document.getElementById("dot").addEventListener("click",({target}) =>{ //operação de produto escalar
    const vector = "V" + document.getElementById("opd").value;
    if(vectors[vector]){
        const k = eval(prompt("Digite o valor de k"));
        if(parseFloat(k) != k) return
        document.getElementById("rd").value = vectors[vector].dot(k).str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para o vetor ${vector}`);
});

document.getElementById("cl").addEventListener("click",({target}) =>{ //operação de colinearidade
    const vector1 = "V" + document.getElementById("opc1").value;
    const vector2 = "V" + document.getElementById("opc2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rc").value = colinear(vectors[vector1], vectors[vector2]);
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("sum").addEventListener("click",({target}) =>{ //operação de soma
    const vector1 = "V" + document.getElementById("ops1").value;
    const vector2 = "V" + document.getElementById("ops2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rs").value = sum(vectors[vector1], vectors[vector2]).str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("sub").addEventListener("click",({target}) =>{ //operação de subtração
    const vector1 = "V" + document.getElementById("opsm1").value;
    const vector2 = "V" + document.getElementById("opsm2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rsm").value = sum(vectors[vector1], vectors[vector2].dot(-1)).str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("pe").addEventListener("click",({target}) =>{ //operação produto escalar
    const vector1 = "V" + document.getElementById("ope1").value;
    const vector2 = "V" + document.getElementById("ope2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rpe").value = precision(dotProduct(vectors[vector1], vectors[vector2]));
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("pv").addEventListener("click",({target}) =>{ //operação produto vetorial
    const vector1 = "V" + document.getElementById("opv1").value;
    const vector2 = "V" + document.getElementById("opv2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rpv").value = crossProduct(vectors[vector1], vectors[vector2]).str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("oa").addEventListener("click",({target}) =>{ //operação produto vetorial
    const vector1 = "V" + document.getElementById("opa1").value;
    const vector2 = "V" + document.getElementById("opa2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("ra").value = precision(Math.acos(dotProduct(vectors[vector1], vectors[vector2])/(vectors[vector1].module() * vectors[vector2].module()))) + " rad";
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});

document.getElementById("ovp").addEventListener("click",({target}) =>{ //operação vetor projeção
    const vector1 = "V" + document.getElementById("opvp1").value;
    const vector2 = "V" + document.getElementById("opvp2").value;
    if(vectors[vector1] && vectors[vector2]){
        document.getElementById("rvp").value = vectors[vector2].dot(Math.abs(dotProduct(vectors[vector2], vectors[vector1])/(dotProduct(vectors[vector2], vectors[vector2])))).str();
        return
    }
    alert(`Não foi encontrado nenhuma correspondência para os vetores ${vector1} ou ${vector2}`);
});