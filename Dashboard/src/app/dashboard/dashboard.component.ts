import { DatePipe } from './../shared/pipe/date.pipe';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { shareReplay, tap } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stockPrices!: number[];
  dataSet: string[] = [];
  symbolName: string = 'JPM';
  altaSemana!: string;
  baixaSemana!: string;
  descricao!: string;
  name!: string;
  myChart!: Chart;
  dol: string = 'USD';
  brl: string = 'BRL';
  result!: string;
  tempo!: string;
  constructor(
    private alpha: AlphaVantageService,
    private datetransform: DatePipe
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  converter() {
    const conversor = this.alpha.getExchange(this.dol, this.brl);
    conversor.subscribe((res: any) => {
      console.log(res);
      this.result = res['Realtime Currency Exchange Rate']['8. Bid Price'];
      console.log(this.result);
    });
  }

  updateData() {
    this.converter();
    this.getCompanyOverview();
    this.getPrices(this.tempo);
    this.updateChart();
  }

  updateChart() {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
  }

  getCompanyOverview() {
    let overview = this.alpha.getData(this.symbolName).pipe(shareReplay());
    overview.subscribe((data) => {
      this.descricao = data['Description'];
      this.altaSemana = data['52WeekHigh'];
      this.baixaSemana = data['52WeekLow'];
      this.symbolName = data['Symbol'];
      this.name = data['Name'];
    });
  }

  getPrices(tempo: string) {
    const response = this.alpha.getSeries(this.symbolName).pipe(shareReplay());
    response.subscribe((data) => {
      let dados = data['Time Series (Daily)'];
      let dateArray: string[] = Object.keys(dados).reverse();
      let priceArray: number[] = Array(dados);
      priceArray.forEach((element: any) => {
        let price: any = Object.values(element).map(
          (res: any) => res['4. close']
        ).reverse()
        switch (tempo) {
          case '90':
            this.stockPrices = price.slice(10)
            this.dataSet = dateArray.slice(10);
            this.updateChart()
            break;
          case '30':
            this.stockPrices = price.slice(70)
            this.dataSet = dateArray.slice(70);
            this.updateChart()
            break;
          default:
            this.stockPrices = price.slice(93)
            this.dataSet = dateArray.slice(93);
            this.updateChart()
            break;
          }
          for (let i = 0; i < this.dataSet.length; i++) {
            this.dataSet[i] = this.datetransform.transform(this.dataSet[i]);
          }
          this.renderChart(this.dataSet, this.stockPrices, this.symbolName);
      });
    });
  }

  renderChart(dataSet: any, stockPrices: any, symbol?: string) {
    this.myChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: dataSet,
        datasets: [
          {
            label: `Valor da ${symbol}`,
            data: stockPrices,
            backgroundColor: [
              // 'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              // 'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
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
