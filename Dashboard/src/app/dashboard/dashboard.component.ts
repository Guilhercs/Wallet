import { AlphaVantageService } from './alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { map, Observable, shareReplay } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  indices = [1, 2, 3, 4, 5, 6 ,7 ,8 ,9];
  stock_prices = [1, 2, 3, 4, 5, 6 ,7 ,8 ,9];
  usable!: any[];
  date!: any[]
  constructor(private alpha: AlphaVantageService) {}
  dataLabel!: any;
  dataSet: any;

  ngOnInit(): void {
    this.RenderChart(this.indices, this.stock_prices);
  }

  // getCompanyOverview() {
  //   let overview = this.alpha.getData().pipe(shareReplay());
  //   overview.subscribe((data) => {
  //     this.dataLabel = data['Description'];
  //     console.log(this.dataLabel);

  //   });
  // }

  // getPrices() {
  //   this.indices = [];
  //   this.stock_prices = [];
  //   let resp = this.alpha.getSeries().pipe(shareReplay());
  //   resp.subscribe((data) => {
  //     this.usable = data['Time Series (Daily)'];
  //     var dates = Object.keys(this.usable);
  //     for (let i = 0; i < 1000 && i < dates.length; i++) {
  //       this.indices.push(dates[i]);
  //       this.stock_prices.push(this.usable[dates[i]]['4. close']);
  //

  //     }
  //   });
  // }

  RenderChart(indices: any, stockPrices: any) {
    const myChart = new Chart('piechart', {
      type: 'line',
      data: {
        labels: indices,
        datasets: [
          {
            label: '# of Votes',
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
