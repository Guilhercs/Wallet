import { DadosDeMercadoService } from './../shared/services/ddm.services/dados-de-mercado.service';
import { Acoes } from './../shared/interfaces/acoes.interface';
import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

Chart.register(...registerables);
@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss'],
})
export class CarteiraComponent implements OnInit {
  myChart!: Chart;
  data!: any;
  ticker: string = 'TAEE4';
  displayedColumns = ['id', 'symbol', 'price', 'quantidade', 'total', 'acoes'];
  qnt!: number;
  mult!: number;
  preco!: number;
  total: any;
  porcentagem: any;

  constructor(
    private carteira: CarteiraService,
    private router: Router,
    private dados: DadosDeMercadoService
  ) {}

  ngOnInit(): void {
    this.updateWallet();
  }
  getPriceToday() {
    this.dados.getQuotes(this.ticker).subscribe((res) => {
      console.log(res);
      let arr = Array(res);
     let banana = arr.map((res: any) => res[res.length - 1].close)
     console.log(banana);

    });
  }

  formRoute() {
    this.router.navigate(['/form']);
  }

  updateWallet() {
    this.tableInfo();
    this.renderChartData();
    this.getPriceToday();
    this.updateChart();
  }

  updateChart() {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
  }

  tableInfo() {
    this.carteira.getWallet().subscribe((res) => {
      this.data = res;
    });
  }

  renderChartData() {
    this.carteira.getWallet().subscribe((res) => {
      let data = Array(res);
      data.forEach((element: [Acoes]) => {
        const reducer = (valorInicial: number, ValorAdicional: number) =>
          valorInicial + ValorAdicional;
        let ticker = Object.values(element).map((res: Acoes) => res.symbol);
        let valores = element.map((res: Acoes) => res.price * res.quantidade);
        this.total = valores.reduce(reducer);
        let calc = Object.values(element).map((res: Acoes) => {
          let mult = res.price * res.quantidade;
          let porcentagem = (mult * 100) / this.total;
          return Math.round(porcentagem) //.toString().concat('%');
        });
        console.log(calc);

        this.porcentagem = calc;
        this.renderPieChart(ticker, this.porcentagem);
      });
    });
  }

  renderPieChart(ticker: any, soma?: any) {
    this.myChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ticker,
        datasets: [
          {
            data: soma,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(172, 92, 138, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(172, 92, 138, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this.myChart;
  }
}
