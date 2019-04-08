
function dpeTotal(quantidade) { 
    var vetTotal = new Array();
    
    for (var i = 0; i < quantidade; i++) {
        vetTotal.push(i);
    }
    return vetTotal.sort(function(a, b) {
        return a - b;

    });

}



function calculaAmostraErro(quantidadeTotal, erro) {
erro = Math.pow((erro / 100), 2);
return populacao = Math.round((quantidadeTotal * (1 / erro)) / (quantidadeTotal + (1 / erro)));
}


function aleatoriaSimples(populacao, amostra) {
    var vetQuantidade = new Array();
    while (vetQuantidade.length != amostra) {
        var position = parseInt((Math.ceil(Math.random() * populacao)));
        if (vetQuantidade.indexOf(position) === -1) {
            vetQuantidade.push(position)
                 }
    }
    return vetQuantidade.sort(function(a, b) {
        return a - b;
    });
}

function validaExtratos(vetExtratos, populacao) {
    var soma = 0;
    for (var i = 0; i < vetExtratos.length; i++) {
        soma += vetExtratos[i];
    }
    if (soma == populacao) {
        return true
    } else {
        return false;
    }
}

function propExtratos(vetExtratos, populacao) {
    var prop = new Array();
    for (var i = 0; i < vetExtratos.length; i++) {
        prop.push([vetExtratos[i], ((vetExtratos[i] / populacao) * 100)]);
    }
    return prop;

    function extratificadaProp(arrayExtratos, populacao, amostra) {
    var retorno = new Array();
    controle = amostra;
    for (var i = 0; i < arrayExtratos.length; i++) {
        retorno.push([arrayExtratos[i][0], arrayExtratos[i][1], (Math.ceil(arrayExtratos[i][1] * (amostra / 100)))]);
        controle -= retorno[i][2];
    }
    /*se a proporção não bater com o total esperado, 
    adiciona ou remove a diferenaça do ultimo, sempre 1, de acordo com o valor da variavel controle*/
    arrayExtratos[(arrayExtratos.length - 1)][2] += controle;
    return retorno;




    //
    function tabelaQuantDiscreta(dados) {
  
    var tabela = new Array();

    
    for (var i = 0; i < dados.length; i++) {
        var achou = false;
        for (var j = 0; j < tabela.length; j++) {
            
            if (dados[i] == tabela[j][0]) {
                tabela[j][1] += 1;
                achou = true;
                continue;
            }
        }
        
        if (achou == false) {
            tabela.push([dados[i], 1]);
        }
    }
    /*calculos da tabela*/
    for (var i = 0; i < tabela.length; i++) {
        /*calculo do percentual do indice*/
        tabela[i][2] = parseFloat(((tabela[i][1] / dados.length) * 100).toFixed(3));
        if (i == 0) {
            tabela[i][3] = tabela[i][1];
            tabela[i][4] = tabela[i][2];
        } else {
            /*soma anterior com o autal, acumultivo*/
            tabela[i][3] = tabela[i][1] + tabela[(i - 1)][3];
            tabela[i][4] = tabela[i][2] + tabela[(i - 1)][4];
        }
    }
    return tabela;
}

//
function tabelaQuantContinua(dados) {
    /*calcula a amplitude, maior menos o menor*/
    menor = Math.min.apply(null, dados);
    maior = Math.max.apply(null, dados);
    amplitude = maior - menor;

    /*calcula a raiz da quantidade de elementos do Array*/
    raiz = Math.floor(Math.sqrt(dados.length));

    var achou = false;
    intervaloDeClasse = 0;
    classe = 0;
    while (!achou) {
        amplitude++;
        for (var i = -1; i < 2; i++) {
            if ((amplitude % (raiz + i)) == 0) {
                achou = true;
                classe = (i + raiz);
                intervaloDeClasse = (amplitude / classe);
                break;
            }
        }
    }
   
    var tabela = new Array();

    /*monta a tabela*/
    for (var i = 0; i < classe; i++) {
        /*incrementa a classe*/
        tabela.push([(i + 1)]);
        /*monta o intervalo de salários*/
        tabela[i][1] = menor + (i * intervaloDeClasse);
        tabela[i][2] = " |-- ";
        tabela[i][3] = menor + ((i + 1) * intervaloDeClasse);

        /*Verifica a quantidade de repetições no intervalo, e incrementa na tabela*/
        count = 0;
        for (var j = 0; j < dados.length; j++) {
            if ((dados[j] >= tabela[i][1]) && (dados[j] < tabela[i][3])) {
                count++;
            }
        }
        tabela[i][4] = count;

        /*calcula o percentual da quantidade de repetição*/
        tabela[i][5] = ((tabela[i][4] / dados.length) * 100);

        /*calcula acumulado de repetição e de percentual
        primeiro indice não soma com anterior*/
        if (i == 0) {
            tabela[i][6] = tabela[i][4];
            tabela[i][7] = tabela[i][5];
        } else {
            tabela[i][6] = tabela[i][4] + tabela[(i - 1)][6];
            tabela[i][7] = tabela[i][5] + tabela[(i - 1)][7];
        }
        /*Calculo ma media por classe*/
        tabela[i][8] = ((tabela[i][1] + tabela[i][3]) / 2);
    }
    return tabela;
}

// discreta
function modaVarDis(tabela) {
    /*cria um array para a moda e adiciona como moda o primeiro valor de tabela
    0 - variavel
    1 - quantidade de repetição
    */
    var moda = new Array();
    moda.push([tabela[0][0], tabela[0][1]]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        if (tabela[i][1] > moda[0][1]) {
            /*quando acha um maior, zera o array, e adiciona ele*/
            moda.splice(0, moda.length);
            moda.push([tabela[i][0], tabela[i][1]]);
        } else if (tabela[i][1] == moda[0][1]) {
            moda.push([tabela[i][0], tabela[i][1]]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.celar;
    }
    return moda;
}
// continua
function mediaVarContinua(tabela, populacao) {
    soma = 0;
    for (var i = 0; i < tabela.length; i++) {
        soma += (tabela[i][8] * tabela[i][4]);
    }
    return (soma / populacao);
}

//
function modaConvVarCont(tabela) {
    
    var moda = new Array();
    /*insere a primeira posição como moda*/
    moda.push([tabela[0][0], tabela[0][4], tabela[0][8]]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        if (tabela[i][4] > moda[0][1]) {
            /*quando acha um maior, zera o array, e adiciona ele*/
            moda.splice(0, moda.length);
            moda.push([tabela[i][0], tabela[i][4], tabela[i][8]]);
        } else if (tabela[i][1] == moda[0][1]) {
            moda.push([tabela[i][0], tabela[i][4], tabela[i][8]]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.celar;
    }
    return moda;
}


//////



function validaEntrada(num) {
    //função para validar entrada apenas de numeros e ;
    var er = /[^0-9;.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    } else if (campo == ",") {
        campo.value = ".";
    }
}


function setPopulacao() {
    v_populacao = parseFloat(document.getElementById("populacao").value);
}

function setErro() {
    v_erro = parseFloat(document.getElementById("erro").value);
}

function setValor() {
    v_valor = parseFloat(document.getElementById("valor").value);
}

function addValor() {
    if (!(v_valor > 0)) {
        alert("É necessário informar um valor antes!!");
        throw "";
    }
    v_valores.push(v_valor);
    getValores();
    document.getElementById("valor").value = null;
    v_valor = null;
}

function getValores() {
    v_valores_str = "";
    v_valores = ordena(v_valores);
    for (var i = 0; i < v_valores.length; i++) {
        if (v_valores_str == "") {
            v_valores_str = v_valores[i]
        } else {
            v_valores_str += ";" + v_valores[i];
        }
    }
    v_tabelaDiscreta.splice(0, v_tabelaDiscreta.length);
    v_tabelaContinua.splice(0, v_tabelaContinua.length);
    document.getElementById("valores").value = v_valores_str;
}

function setValores() {
    v_valores.splice(0, v_valores.length);
    v_valores_str = document.getElementById("valores").value;
    v_valores = v_valores_str.split(";").map(function(t) {
        return parseFloat(t)
    });
    v_valores = ordena(v_valores);
}

function setValorExtrato() {
    v_valorExtrato = parseFloat(document.getElementById("valorExtrato").value);
}

function addValorExtrato() {
    if (!(v_valorExtrato > 0)) {
        alert("É necessário informar um valor antes!!");
        throw "";
    }
    v_valoresExtrato.push(v_valorExtrato);
    getValoresExtrato();
    document.getElementById("valorExtrato").value = null;
    v_valorExtrato = null;
}

function getValoresExtrato() {
    v_valoresExtrato_str = "";
    for (var i = 0; i < v_valoresExtrato.length; i++) {
        if (v_valoresExtrato_str == "") {
            v_valoresExtrato_str = v_valoresExtrato[i]
        } else {
            v_valoresExtrato_str += ";" + v_valoresExtrato[i];
        }
    }
    document.getElementById("valoresExtrato").value = v_valoresExtrato_str;
}

function setValoresExtrato() {
    v_valoresExtrato.splice(0, v_valoresExtrato.length);
    v_valoresExtrato_str = document.getElementById("valoresExtrato").value;
    v_valoresExtrato = v_valoresExtrato_str.split(";").map(function(t) {
        return parseFloat(t)
    });
}