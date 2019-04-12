function entrada() {
  var vetor = [];


  var dados = document.getElementById("dados").value;
  var nomevar = document.getElementById("nomevar").value;
  var quartil = document.getElementById("quartil").value;
  var quintil = document.getElementById("quintil").value;
  var decil = document.getElementById("decil").value;
  var porcentil = document.getElementById("porcentil").value;

  if (quartil != "") {
    var valorsep = quartil;
  } else if (quintil != "") {
    var valorsep = quintil;
  } else if (decil != "") {
    var valorsep = decil;
  } else if (porcentil != "") {
    var valorsep = porcentil;
  } else {
    var valorsep = 0;
  }

  //separa todos os elementos entre ;
  var separatriz = 1;
  vetor = dados.split(";");
  for (let i = 0; i < vetor.length; i++) {
    vetor[i] = vetor[i].replace(",", ".");
  }
  // Tipo de processo
  var amostra = document.getElementById("amostra").checked;
  //QUANTITATIVA
  if (isNaN(vetor[0]) != true) {
    for (let i = 0; i < vetor.length; i++) {
      vetor[i] = parseFloat(vetor[i]);
    }

    var left = 0;
    var right = vetor.length;

    quicksort(vetor, left, right);

    quantitativa(vetor, nomevar, amostra, separatriz, valorsep);
    //QUALITATIVA
  } else {
    for (var i = 0; i < vetor.length; i++) {
      vetor[i] = vetor[i].toUpperCase();
      vetor[i] = vetor[i].trim(); //trim = espaço vazio
    }

    vetor.sort();

    qualitativa(vetor, nomevar);
  }
  separatrizes(vetor, valorsep, separatriz);
}
// QUICKSORT
function particao(vetor, left, right) {
  var i, j, aux;
  i = left;
  for (j = left + 1; j <= right; ++j) {
    if (vetor[j] < vetor[left]) {
      ++i;
      aux = vetor[i];
      vetor[i] = vetor[j];
      vetor[j] = aux;
    }
  }
  aux = vetor[left];
  vetor[left] = vetor[i];
  vetor[i] = aux;
  return i;
}

function quicksort(vetor, left, right) {
  var r;
  if (right > left) {
    r = particao(vetor, left, right);
    quicksort(vetor, left, r - 1);
    quicksort(vetor, r + 1, right);
  }
}


function qualitativa(vetor, nomevar) {
  var elemento = [];
  var quantidade = [];

  for (let i = 0; i < vetor.length; i++) {
    elemento[i] = vetor[i];
  }
  //new set exclui todos elementos iguais
  var elemento = [...new Set(vetor)];
  var cont = 0;
  var totalV = 0;

  for (let i = 0; i < elemento.length; i++) {
    cont = 0;
    for (let j = 0; j < vetor.length; j++) {
      if (elemento[i] == vetor[j]) {
        cont++;
        totalV++;
      }
    }
    quantidade[i] = cont;
  }
  //Media, Moda
  var media = "Processos estatisticos qualitativos não tem média. ";
  var aux = 0;
  var cont = 0;
  //pega o maior numero da quantidade.
  for (let i = 0; i < quantidade.length; i++) {
    if (quantidade[i] >= aux) {
      aux = quantidade[i];
    }
  }
  //Moda
  var moda = "";

  for (var i = 0; i < quantidade.length; i++) {
    if (aux == quantidade[i]) {
      moda = moda + " " + elemento[i];
      cont++;
    }
    if (cont == quantidade.length) {
      moda = " Não tem moda";
    }
  }
 mediana = "";
  var posicao = totalV / 2;
  if (totalV % 2 == 0) {
    if (vetor[posicao - 1] == vetor[posicao]) {
      mediana = vetor[posicao];
    } else {
      mediana = vetor[posicao] + " e " + vetor[posicao - 1];
    }
  } else {
    mediana = vetor[Math.round(posicao)];
  }

  
  //saida de dados
  exibe = exibe + "</tbody> </table>";
  document.getElementById("mmm").innerHTML =
    "Media: " +
    media +
    "<br>" +
    " Moda: " +
    moda +
    "<br>" +
    " Mediana: " +
    mediana;
  document.getElementById("exibe").innerHTML = exibe;

}

//                            QUALITATIVA

function quantitativa(vetor, nomevar, amostra, separatriz, valorsep) {

  var elemento = [];
  var quantidade = [];
  var classe = [];
  var quant = [];
  var element = [];
  var amplitude = [];


  for (let i = 0; i < vetor.length; i++) {
    elemento[i] = vetor[i];
  }

  var elemento = [...new Set(vetor)];
  var cont = 0;
  var totalV = 0;

  for (let i = 0; i < elemento.length; i++) {
    cont = 0;
    for (let j = 0; j < vetor.length; j++) {
      if (elemento[i] == vetor[j]) {
        cont++;
        totalV++;
      }
    }
    quantidade[i] = cont;
  }
  //caso o elemento tenha mais de 10 elementos diferentes ele será continuo , se tiver menos de 10 será discreto
  if (elemento.length >= 10) {
    separatriz = 0;

    var amplitude = vetor[vetor.length - 1] - vetor[0];
    var clas = Math.floor(Math.sqrt(totalV));
    classe[0] = clas - 1;
    classe[1] = clas;
    classe[2] = clas + 1;

    var auxcont = 1;
    var linhas = 0;
    var intervalo = 0;
    //Linhas do intervalo
    while (auxcont != 0) {
      amplitude++;
      for (let i = 0; i < 3; i++) {
        if (amplitude % classe[i] == 0) {
          auxcont = 0;
          linhas = classe[i];
          intervalo = amplitude / classe[i];
          break;
        }
      }
    }
    menorv = vetor[0];
    maior = menorv + intervalo;
    j = 0;
    for (var i = 0; i < linhas; i++) {
      var cont = 0;
      while (vetor[j] < maior) {
        cont++;
        j++;
      }
      maior = maior + intervalo;
      quant[i] = cont;
    }
    media = 0;
    maior = menorv + intervalo;
    for (var i = 0; i < linhas; i++) {
      element[i] = (menorv + maior) / 2;
      amplitude[i] = menorv + "├──" + maior;
      menorv = maior;
      maior = maior + intervalo;
    }

    for (var i = 0; i < linhas; i++) {
      media = media + element[i] * quant[i];
    }
    media = media / totalV;
    aux = 0;
    cont = 0;
    //Maior numero
    for (let i = 0; i < quant.length; i++) {
      if (quant[i] >= aux) {
        aux = quant[i];
      }
    }
    var moda = "";
    for (var i = 0; i < quant.length; i++) {
      if (aux == quant[i]) {
        moda = moda + "  " + element[i];
        cont++;
      }
      if (cont == quant.length) {
        moda = "Não tem moda";
      }
    }

    mediana = liminf + ((posicao - facant) / linhas) * intervalo;
    var dp = 0;
    for (let i = 0; i < quant.length; i++) {
      dp = dp + Math.pow(element[i] - media, 2) * quant[i];
    }
    if (amostra === true) {

      dp = dp / (totalV - 1);
      dp = Math.sqrt(dp);
    } else {

      dp = dp / totalV;
      dp = Math.sqrt(dp);
    }

    var CV = (dp / media) * 100;

    exibe = exibe + "</tbody> </tabela>";

  } else {

    //                    QUANTITATIVA DISCRETA
    media = 0;
    for (let i = 0; i < elemento.length; i++) {
      media = media + elemento[i] * quantidade[i];
    }
    media = media / totalV;
    var aux = 0;
    var cont = 0;
    for (let i = 0; i < quantidade.length; i++) {
      if (quantidade[i] >= aux) {
        aux = quantidade[i];
      }
    }
    var moda = "";
    for (var i = 0; i < quantidade.length; i++) {

      if (aux == quantidade[i]) {
        moda = moda + "  " + elemento[i];
        cont++;
      }

      if (cont == quantidade.length) {
        moda = "Não tem moda";
      }
    }
    var posicao = totalV / 2;
    if (totalV % 2 == 0) {
      if (vetor[posicao - 1] == vetor[posicao]) {
        mediana = vetor[posicao];
      } else {
        mediana = (vetor[posicao] + vetor[posicao - 1]) / 2;
      }
    } else {
      mediana = vetor[Math.round(posicao)];
    }
    var dp = 0;
    for (let i = 0; i < quantidade.length; i++) {
      dp = dp + Math.pow(elemento[i] - media, 2) * quantidade[i];
    }
    if (amostra === true) {
      dp = dp / (totalV - 1);
      dp = Math.sqrt(dp);
    } else {
      dp = dp / totalV;
      dp = Math.sqrt(dp);
    }
    var CV = (dp / media) * 100;


    document.getElementById("mmm").innerHTML =
      "Media: " +
      media.toFixed(2) +
      "<br>" +
      "Moda : " +
      moda +
      "<br>" +
      "Mediana: " +
      mediana +
      "<br>" +
      " O Desvio Padrão é de : " +
      dp.toFixed(2) +
      "<br>" +
      "O Coeficiente de variação é de : " +
      CV.toFixed(2) +
      "%";

    moda = "";
  }
}
