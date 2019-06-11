function entrada() { 
  var valido = true;
  formulario = document.getElementById("formDescritiva");

  if (formulario.nomevar.value == "") {
    valido = false;
  }
  else if (formulario.dados.value == "") {
    valido = false;
  }
  if (valido == false) {
    alert("Preencha os campos obrigatórios");
    return 0;
  }

  var vetor = [];
  var dados = document.getElementById("dados").value;
  var nomevar = document.getElementById("nomevar").value;
  var quartil = document.getElementById("quartil").value;
  var quintil = document.getElementById("quintil").value;
  var decil = document.getElementById("decil").value;
  var porcentil = document.getElementById("porcentil").value;
  //document.getElementById("cardresposta").style.display = "block";
  //document.getElementById("saidaDescritiva").style = "display: block" //isso aqui ta bugando o calcular

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

  var separatriz = 1;
  vetor = dados.split(";");
  for (let i = 0; i < vetor.length; i++) {
    vetor[i] = vetor[i].replace(",", ".");
  }

  var amostra = document.getElementById("amostra").checked;

  if (isNaN(vetor[0]) != true) {

    for (let i = 0; i < vetor.length; i++) {
      vetor[i] = parseFloat(vetor[i]);
    }
    var left = 0;
    var right = vetor.length;
    quicksort(vetor, left, right);
    quantitativa(vetor, nomevar, amostra, separatriz, valorsep);
  } else {

    for (var i = 0; i < vetor.length; i++) {
      vetor[i] = vetor[i].toUpperCase();
      vetor[i] = vetor[i].trim();
    }
    vetor.sort();
    qualitativa(vetor, nomevar);
  }
  separatrizes(vetor, valorsep, separatriz);
}

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
  var tabela = [];

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
  var media = "Processos estatisticos qualitativos não tem média. ";
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
      moda = moda + " " + elemento[i];
      cont++;
    }
    if (cont == quantidade.length) {
      moda = " Não tem moda";
    }
  }
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
  var fac = 0;
  var facpor = 0;
  var exibe =
    "<thead>" +
    "<tr>" +
    "<th align=center>" +
    nomevar +
    "</th>" +
    "<th align=center> &nbsp&nbsp&nbsp&nbsp Frequencia </th>" +
    "<th align=center> &nbsp&nbsp&nbsp&nbsp FR % </th>" +
    "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac </th>" +
    "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac % </th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";

  for (let i = 0; i < elemento.length; i++) {
    var objeto = new Object();
    objeto.frpor = (quantidade[i] * 100) / totalV;
    objeto.fac = fac = fac + quantidade[i];

    objeto.facpor = facpor = facpor + objeto.frpor;
    tabela.push(objeto);
    exibe =
      exibe +
      "<tr>" +
      "<td align=center>" +
      elemento[i] +
      "</td>" +
      "<td align=center>" +
      quantidade[i] +
      "</td>" +
      "<td align=center>" +
      tabela[i].frpor.toFixed(2) +
      "% </td>" +
      "<td align=center>" +
      tabela[i].fac +
      "</td>" +
      "<td align=center>" +
      tabela[i].facpor.toFixed(2) +
      "% </td>" +
      "</tr>";
  }
  exibe = exibe + "</tbody> </table>";
  document.getElementById("saida").innerHTML =
    "Media: " +
    media +
    "<br>" +
    " Moda: " +
    moda +
    "<br>" +
    " Mediana: " +
    mediana;
  document.getElementById("exibe").innerHTML = exibe;
  moda = "";
  var data = [];
  var chart = [];
  var optionspizza = {
    aspectRatio: 2,
    title: {
      display: true,
      text: "pesquisa:" + nomevar,
      fontSize: 15,
      borderWidth: 100
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#000"
      }
    },

    layout: {
      padding: {
        left: 0,
        right: 150,
        bottom: 0,
        top: 0
      }
    },
    tooltips: {
      enabled: true
    }
  };
  for (let i = 0; i < elemento.length; i++) {
    chart[i] = elemento[i];
  }
  for (let i = 0; i < quantidade.length; i++) {
    data[i] = quantidade[i];
  }
  var label = optionspizza;

  graficoQuali(chart, data, label);
  var graficoVar;

  function graficoQuali(chart, data, label) {
    var ctx = document.getElementById("myChart").getContext("2d");
    if (graficoVar != null) {
      graficoVar.destroy();
    }

    graficoVar = new Chart(ctx, {
      type: "pie",
      data: {
        labels: chart,
        datasets: [
          {
            label: nomevar,
            data: data,
            backgroundColor: [
              "rgba(72, 61, 139, 0.6)",

              "rgba(0, 0, 255, 0.6)",

              "rgba(34, 139, 34, 0.6)",

              "rgba(255, 255, 0, 0.6)",

              "rgba(255, 0, 0, 0.6)",

              "rgba(0, 255, 127, 0.6)",

              "rgba(255, 140, 0, 0.6)",

              "rgba(54, 162, 235, 0.6)",

              "rgba(255, 206, 86, 0.6)",

              "rgba(75, 192, 192, 0.6)",

              "rgba(255, 99, 132, 0.6)",

              "rgba(25, 25, 112, 0.6)",

              "rgba(100, 149, 237, 0.6)",

              "rgba(0, 250, 154, 0.6)",

              "rgba(165, 42, 42, 0.6)",

              "rgba(148, 0, 211, 0.6)",

              "rgba(153, 102, 255, 0.6)",

              "rgba(255, 159, 64, 0.6)",

              "rgba(205, 69, 102, 0.6)",

              "rgba(47, 79, 79, 0.6)",

              "rgba(119, 136, 153, 0.6)"
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000"
          }
        ]
      },
      options: label
    });
  }
  function attgrafico() {
    removeData(Chart);
    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      chart.update();
    }
    addData(chart, label, data);
    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
      });
      chart.update();
    }
  }
}

function quantitativa(vetor, nomevar, amostra, separatriz, valorsep) {
  var elemento = [];
  var quantidade = [];
  var tabela = [];
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

  if (elemento.length >= 10) {
    separatriz = 0;
    var at = vetor[vetor.length - 1] - vetor[0];
    var clas = Math.floor(Math.sqrt(totalV));
    classe[0] = clas - 1;
    classe[1] = clas;
    classe[2] = clas + 1;

    var auxcont = 1;
    var linhas = 0;
    var intervalo = 0;

    while (auxcont != 0) {
      at++;
      for (let i = 0; i < 3; i++) {
        if (at % classe[i] == 0) {
          auxcont = 0;
          linhas = classe[i];
          intervalo = at / classe[i];
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
    var posicao = totalV / 2;

    if (totalV % 2 == 0) {
      var classemd = vetor[posicao];
    } else {
      classemd = vetor[Math.round(posicao)];
    }

    menorv = vetor[0];
    j = 0;
    liminf = 0;
    for (var i = 0; i < linhas; i++) {
      if (menorv <= vetor[posicao] && vetor[posicao] < menorv + intervalo) {
        liminf = menorv;
      }
      menorv = menorv + intervalo;
    }

    maior = menorv + intervalo;
    var fac = 0;
    var facpor = 0;
    var exibe =
      "<thead>" +
      "<tr>" +
      "<th align=center>" +
      "Classe" +
      "</th>" +
      "<th align=center>" +
      nomevar +
      "</th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Frequencia </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp FR % </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac % </th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>";

    var tabela2 = [];
    menorv = vetor[0];
    facant = 0;
    for (let i = 0; i < element.length; i++) {
      var objeto2 = new Object();
      objeto2.frpor = (quant[i] * 100) / totalV;
      objeto2.fac = fac = fac + quant[i];

      objeto2.facpor = facpor += objeto2.frpor;

      tabela2.push(objeto2);
      exibe =
        exibe +
        "<tr>" +
        "<td align=center>" +
        (i + 1) +
        "</td>" +
        "<td align=center>" +
        menorv +
        "├──" +
        (menorv + intervalo) +
        "</td>" +
        "<td align=center>" +
        quant[i] +
        "</td>" +
        "<td align=center>" +
        tabela2[i].frpor.toFixed(2) +
        "% </td>" +
        "<td align=center>" +
        tabela2[i].fac +
        "</td>" +
        "<td align=center>" +
        tabela2[i].facpor.toFixed(2) +
        "% </td>" +
        "</tr>";
      if (liminf > menorv) {
        if (tabela2[i].fac == 0) {
          facant = 0;
        } else {
          facant = tabela2[i].fac;
        }
      }
      menorv = menorv + intervalo;
    }
    mediana = liminf + ((posicao - facant) / linhas) * intervalo;
    var res = liminf + ((valorsep - facant) / linhas) * intervalo;


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

    document.getElementById("saida").innerHTML =
      "Media: " +
      media.toFixed(2) +
      "<br>" +
      "Moda : " +
      moda +
      "<br>" +
      "Mediana: " +
      mediana +
      "<br>" +
      " Desvio Padrão : " +
      dp.toFixed(2) +
      "<br>" +
      "Coeficiente de variação: " +
      CV.toFixed(2) +
      "%";
    document.getElementById("resultado").innerHTML = exibe;
  } else {

    //qualitativa discreta
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

    var fac = 0;
    var facpor = 0;
    var exibe =
      "<thead>" +
      "<tr>" +
      "<th align=center>" +
      nomevar +
      "</th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Frequencia </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp FR % </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac </th>" +
      "<th align=center> &nbsp&nbsp&nbsp&nbsp Fac % </th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>";

    for (let i = 0; i < elemento.length; i++) {
      var objeto = new Object();
      objeto.frpor = (quantidade[i] * 100) / totalV;
      objeto.fac = fac = fac + quantidade[i];

      objeto.facpor = facpor = facpor + objeto.frpor;
      tabela.push(objeto);
      exibe =
        exibe +
        "<tr>" +
        "<td align=center>" +
        elemento[i] +
        "</td>" +
        "<td align=center>" +
        quantidade[i] +
        "</td>" +
        "<td align=center>" +
        tabela[i].frpor.toFixed(2) +
        "% </td>" +
        "<td align=center>" +
        tabela[i].fac +
        "</td>" +
        "<td align=center>" +
        tabela[i].facpor.toFixed(2) +
        "% </td>" +
        "</tr>";
    }

    exibe = exibe + "</tbody> </tabela>";
    document.getElementById("saida1").innerHTML =
      "Media: " +
      media.toFixed(2)
    document.getElementById("saida2").innerHTML =
      "<br>" +
      "Moda : " +
      moda
    document.getElementById("saida3").innerHTML =
      "<br>" +
      "Mediana: " +
      mediana
    document.getElementById("saida4").innerHTML =
      "<br>" +
      " Desvio Padrão : " +
      dp.toFixed(2)
    document.getElementById("saida5").innerHTML =
      "<br>" +
      "Coeficiente de variação: " +
      CV.toFixed(2) +
      "%";
    document.getElementById("exibe").innerHTML = exibe;
    moda = "";
  }
  var chart=[]; var data=[]
  var label;
  var optionsc = {
    scales: {
      xAxes: [{
        categoryPercentage: 1,
        barPercentage: 1
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },

    title: {
      display: true,
      text: "pesquisa:" + nomevar,
      fontSize: 15,
      borderWidth: 100

    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#000'
      }
    },

    layout: {
      padding: {
        left: 0,
        right: 150,
        bottom: 0,
        top: 0
      }
    },
    tooltips: {
      enabled: true
    }
  }

  var optionsp = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },

    title: {
      display: true,
      text: "pesquisa:" + nomevar,
      fontSize: 15,
      borderWidth: 100

    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#000'
      }
    },

    layout: {
      padding: {
        left: 0,
        right: 150,
        bottom: 0,
        top: 0
      }
    },
    tooltips: {
      enabled: true
    }
  };



  if (amplitude[0] != null && isNaN(vetor[0]) != true) {
    for (let i = 0; i < amplitude.length; i++) {
      chart[i] = String(amplitude[i]);
    };
    for (let i = 0; i < quant.length; i++) {
      data[i] = quant[i];

    };
    label = optionsc;
    grafico1(chart, data, label);
  }

  else if (amplitude[0] == null && isNaN(vetor[0]) != true) {
    for (let i = 0; i < elemento.length; i++) {
      chart[i] = String(elemento[i]);
    };
    for (let i = 0; i < quantidade.length; i++) {
      data[i] = quantidade[i];

    };
    label = optionsp;
    grafico1(chart, data, label);
  }


  var graficoVar;
  function grafico1(chart, data, label) {


    var ctx = document.getElementById("myChart").getContext('2d');
    if (graficoVar != null) {
      graficoVar.destroy();
    }

    graficoVar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart,
        datasets: [
          {
            label: nomevar,
            data: data,
            backgroundColor: [
              'rgba(72, 61, 139, 0.6)',

              'rgba(0, 0, 255, 0.6)',

              'rgba(34, 139, 34, 0.6)',

              'rgba(255, 255, 0, 0.6)',

              'rgba(255, 0, 0, 0.6)',

              'rgba(0, 255, 127, 0.6)',

              'rgba(255, 140, 0, 0.6)',

              'rgba(54, 162, 235, 0.6)',

              'rgba(255, 206, 86, 0.6)',

              'rgba(75, 192, 192, 0.6)',

              'rgba(255, 99, 132, 0.6)',

              'rgba(25, 25, 112, 0.6)',

              'rgba(100, 149, 237, 0.6)',

              'rgba(0, 250, 154, 0.6)',

              'rgba(165, 42, 42, 0.6)',

              'rgba(148, 0, 211, 0.6)',

              'rgba(153, 102, 255, 0.6)',

              'rgba(255, 159, 64, 0.6)',

              'rgba(205, 69, 102, 0.6)',

              'rgba(47, 79, 79, 0.6)',

              'rgba(119, 136, 153, 0.6)'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
          }],
      },
      options: label
    });
  }

  console.log({ graficoVar });
  function attgrafico() {
    removeData(Chart);
    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      chart.update();
    };
    addData(chart, label, data);
    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
    };

  }
}
function separatrizes(vetor, valorsep, separatriz) {
  if (separatriz == 1) {
    var tamvet = vetor.length - 1;
    posi = (tamvet * valorsep) / 100;
    var res = vetor[Math.round(posi)];
    document.getElementById("saidaseparatriz").innerHTML =
      "Medida Separatriz escolhida: " + res;
  } 
}
