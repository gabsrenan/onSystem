function montaGraficoDiscreta() {
            var titles = new Array();
            var datas = new Array();
            var bkColors = new Array();
            var bdColors = new Array();
            for (var i = 0; i < v_tabelaDiscreta.length; i++) {
                titles.push(v_tabelaDiscreta[i][0]);
                datas.push(v_tabelaDiscreta[i][1]);
                bkColors.push(backColors[i]);
                bdColors.push(borderColors[i]);
            }
            //monta grafico
            var barChartData = {
                labels: titles,
                datasets: [{
                    label: '',
                    borderWidth: 1,
                    data: datas,
                    backgroundColor: bkColors,
                    borderColor: bdColors
                }]
            };

            //monta na tela
            var ctx = document.getElementById("canvasDiscreta").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Gráfico Variável Quantitativa Discreta'
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true // minimum value will be 0.
                            }
                        }]
                    }


                }
            });


        }