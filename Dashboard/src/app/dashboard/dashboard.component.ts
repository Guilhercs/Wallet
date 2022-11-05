import { AlphaVantageService } from '../shared/services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { shareReplay } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  indices: any;
  stockPrices: any;
  usable!: any[];
  date!: any;
  symbol = 'ITSA4';
  symbolName = 'ITSA4';

  constructor(private alpha: AlphaVantageService) {}
  dataLabel!: any;
  dataSet: any;

  ngOnInit(): void {
    this.getPrices(this.symbol);
  }

  // getCompanyOverview() {
  //   let overview = this.alpha.getData().pipe(shareReplay());
  //   overview.subscribe((data) => {
  //     this.dataLabel = data['Description'];
  //     console.log(this.dataLabel);

  //   });
  // }

  getPrices(symbol:string) {
    let resp = this.alpha.getSeries(symbol).pipe(shareReplay());
    resp.subscribe((data) => {
    let dados = data["Time Series (Daily)"];
    let priceArray: number[] = Array(dados);
    let dateArray: string[] = Object.keys(dados).reverse()
    this.dataSet = dateArray
    priceArray.forEach((element: any) => {
      let price: any = Object.values(element).map((res: any) => (res['4. close'])
      )
      this.stockPrices = price.reverse();
    });
    this.RenderChart(this.dataSet, this.stockPrices, this.symbolName)
      });
  }

  RenderChart(indices: any, stockPrices: any, symbol? : string) {
    const myChart = new Chart('piechart', {
      type: 'line',
      data: {
        labels: indices,
        datasets: [
          {
            label: `Valor da ${symbol}`,
            data: stockPrices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              // 'rgba(54, 162, 235, 1)',
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
    return myChart
  }
}
