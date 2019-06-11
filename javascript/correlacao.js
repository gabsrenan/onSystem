function correlacao() {
    var valido = true;
  
  formulario = document.getElementById("formCorrelacao");

      if (formulario.dependente.value == "") {
          valido = false;
      }else if (formulario.independente.value == "") {
          valido = false;
      }
      if (valido == false) {
          alert("Preencha todos os campos!!");
          return 0;
      }
    var Xdepend = []; var Yindepend = [];var reta=[]; var pontos=[];
    var Xdep = (document.getElementById("dependente").value);
    var Yindep = (document.getElementById("independente").value);
document.getElementById("saidacorrelacao").style = "display: block"


    Xdepend = Xdep.split(";");
    Yindepend = Yindep.split(";");
    var somax = 0;
    for (let i = 0; i < Xdepend.length; i++) {
       Xdepend[i] = parseFloat(Xdepend[i]);
        somax += Xdepend[i];
    } 
    
    
    var somay = 0;
    for (let i = 0; i < Yindepend.length; i++) {
        Yindepend[i] = parseFloat(Yindepend[i]);
        somay += Yindepend[i];
    } 
    var y1=Yindepend[0];
    var y2=Yindepend[0]
 for (let i = 0; i < Xdepend.length; i++) {
    pontos.push({
        x:Xdepend[i],
        y:Yindepend[i]}); 
        if (y2 < Yindepend[i]) {
            y2 = Yindepend[i];
        }
        if (y1 > Yindepend[i]) {
            y1 = Yindepend[i];
        }

       
 };
   

    
    var xvezesy = 0;
    var xquadrado = 0;
    var yquadrado = 0;
    for (let i = 0; i < Xdepend.length; i++) {

        xvezesy += Xdepend[i] * Yindepend[i] ;
        xquadrado += Xdepend[i] * Xdepend[i];
        yquadrado += Yindepend[i] * Yindepend[i];

    }
    var tamanhovetor = Xdepend.length;
    var R = (((tamanhovetor*xvezesy)-((somax)*(somay)))/Math.sqrt((tamanhovetor*xquadrado-(somax*somax))*(tamanhovetor*yquadrado-(somay*somay)))*100).toFixed(2);

    var A = (((tamanhovetor*xvezesy)-(somax*somay))/(tamanhovetor*xquadrado-(somax*somax))).toFixed(2);
    var Yrisco = (somay / tamanhovetor).toFixed(2);
    var Xrisco = (somax/tamanhovetor).toFixed(2);
    var B = (Yrisco - A * Xrisco).toFixed(2);
   
    reta=[
        {x:(y1-B)/A,  y:y1},
        {x:(y2-B)/A,  y:y2}];

    document.getElementById('corelasaida').innerHTML = R + "%";
    document.getElementById('equacaosaida').innerHTML = "Y = " + A + " * X " + " + " + B;

    var ctx = document.getElementById('myChart2');   

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            type: 'line',
            label: 'X:',
            data: reta,
            fill: false,
            backgroundColor: "rgba(218,83,79, .7)",
            borderColor: "rgba(218,83,79, .7)",
            pointRadius: 0
          }, {
            type: 'bubble',
            label: 'Y:',
            data: pontos,
            backgroundColor: "rgba(76,78,80, .7)",
            borderColor: "transparent",
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }],
           
          }
        }
      });
  
}
