
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
  ticker: string = 'WEGE3';
  displayedColumns = ['id', 'symbol', 'price', 'quantidade', 'total', 'acoes'];
  qnt!: number;
  mult!: number;
  preco!: number;
  total!: number;
  porcentagem!: number[];
  lastPrice!: number[];
  symbols: [] = [];

  constructor(private carteira: CarteiraService, private router: Router) {}

  ngOnInit(): void {
    this.tableInfo()
    this.updateWallet();
  }
  tableInfo() {
    this.carteira.getWallet().subscribe((res) => {
      this.data = res;
     this.symbols = this.data.map((res: any) => res.symbol);
     this.getPriceToday(this.symbols)
    });
  }
  getPriceToday(arr: []) {
    for(let i = 0; i < arr.length; i++) {
      this.carteira.getPrices(arr[i]).subscribe((res) => {
        let arr = Array(res);
        this.lastPrice = arr.map((res: any) => res[res.length - 1].close);
        console.log(this.lastPrice);
      });
    }
  }

  formRoute() {
    this.router.navigate(['/form']);
  }

  updateWallet() {
    this.tableInfo();
    this.renderChartData();
    this.updateChart();
  }

  updateChart() {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
  }

  renderChartData() {
    this.carteira.getWallet().subscribe((res) => {
      let data = Array(res);
      data.forEach((element: any) => {
        const reducer = (valorInicial: number, ValorAdicional: number) =>
          valorInicial + ValorAdicional;
        let ticker = Object.values(element).map((res: any) => res.symbol);
        let valores = element.map((res: any) => res.price * res.quantidade);
        this.total = valores.reduce(reducer);
        let calc = Object.values(element).map((res: any) => {
          let mult = res.price * res.quantidade;
          let porcentagem = (mult * 100) / this.total;
          return Math.round(porcentagem); //.toString().concat('%');
        });
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
