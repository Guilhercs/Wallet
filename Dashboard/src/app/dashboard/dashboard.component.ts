import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from './../shared/pipe/date.pipe';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { concat, shareReplay } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stockPrices!: number[];
  dataSet: string[] = [];
  symbolName: string = 'ITSA';
  altaSemana!: string;
  baixaSemana!: string;
  descricao!: string;
  name!: string;
  myChart!: Chart;
  dol: string = 'USD';
  brl: string = 'BRL';
  btc: string = 'BTC';
  resultDolar!: string;
  resultBtc!: string;
  tempo!: string;
  dividendLastDate!: string;
  exDividendDate!: string;
  industry!: string;
  constructor(
    private alpha: AlphaVantageService,
    private datetransform: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.updateData();
    this.getCompanyOverview();
    // this.alpha.walletDB(this.symbolName).subscribe(res => {
    //   console.log(res);

    // })
  }

  filterInput() {
    let input, filter
    input = document.getElementById('ticker') as any;
    filter = input.value?.toUpperCase().concat('.SA')
    this.symbolName = filter
  }

  converter() {
    const dolar = this.alpha.getExchange(this.dol, this.brl);
    dolar.subscribe((res: any) => {
      this.resultDolar = res['Realtime Currency Exchange Rate']['8. Bid Price'];
    });
    const bitcoin = this.alpha.getExchange(this.btc, this.brl);
    bitcoin.subscribe((res: any) => {
      console.log(res);
      this.resultBtc = res['Realtime Currency Exchange Rate']['8. Bid Price'];
    });
  }

  updateData() {
    // this.filterInput();
    this.converter();
    this.getCompanyOverview();
    this.getPrices(this.tempo);
    // this.getFullHistory();
    this.updateChart();
  }

  updateChart() {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
  }

  getCompanyOverview() {
    let overview = this.alpha.companies().pipe();
    overview.subscribe((data) => {
      console.log(data);
     let dado = data.find((element: any) => element['b3_issuer_code'] === this.symbolName);
     this.industry = dado.b3_sector;
    });
  }

  // getFullHistory() {
  //   const response = this.alpha
  //     .getSeriesFull(this.symbolName)
  //     .pipe(shareReplay());
  //   response.subscribe((data: any) => {
  //     let dados = data['Time Series (Daily)'];
  //     let dateArray: string[] = Object.keys(dados).reverse();
  //     this.dataSet = dateArray;
  //     let priceArray: number[] = Array(dados);
  //     priceArray.forEach((element: any) => {
  //       let price: any = Object.values(element)
  //         .map((res: any) => res['4. close'])
  //         .reverse();
  //       this.stockPrices = price;
  //     });
  //     this.renderChart(this.dataSet, this.stockPrices, this.symbolName);
  //   });
  // }

  getPrices(tempo: string) {
    const response = this.alpha.getSeries(this.symbolName).pipe(shareReplay());
    response.subscribe((data) => {
      let dados = data['Time Series (Daily)'];
      let dateArray: string[] = Object.keys(dados).reverse();
      let priceArray: number[] = Array(dados);
      priceArray.forEach((element: any) => {
        let price: any = Object.values(element)
          .map((res: any) => res['4. close'])
          .reverse();
        switch (tempo) {
          case '90':
            this.stockPrices = price.slice(10);
            this.dataSet = dateArray.slice(10);
            this.updateChart();
            break;
          case '30':
            this.stockPrices = price.slice(70);
            this.dataSet = dateArray.slice(70);
            this.updateChart();
            break;
          default:
            this.stockPrices = price.slice(93);
            this.dataSet = dateArray.slice(93);
            this.updateChart();
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
