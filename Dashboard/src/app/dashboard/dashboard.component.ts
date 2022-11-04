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
  indices!: any;
  stockPrices!: any[];
  objectData!: any;
  date: any;
  constructor(private alpha: AlphaVantageService) {}
  dataLabel!: any;
  dataSet: any;

  ngOnInit(): void {
    this.getPrices();
    // getCompanyOverview() {
    //   let overview = this.alpha.getData().pipe(shareReplay());
    //   overview.subscribe((data) => {
    //     this.dataLabel = data['Description'];
    //     console.log(this.dataLabel);

    //   });
  }
  getPrices() {
    let historyDaily = this.alpha.getSeries().pipe(shareReplay());
    historyDaily.subscribe((data) => {
      this.indices = data['Time Series (Daily)'];
      console.log(this.indices);
      let dates = Object.values(this.indices);
      console.log(dates);
      dates.forEach((element: any) => {
        element[0]
        console.log(element);

      });
      // for(let i = 0; i<dates.length; i++){
      //   this.indices.push(dates[i]);
      //   console.log(this.indices[i]);
      // }
      // console.log(this.indices, this.stockPrices);
      // this.indices.forEach((res: any) => {
      //   this.stockPrices.push(res['4. close'])
      //   console.log(this.stockPrices);
      // });
      })
  }

  RenderChart(indices: any, stockPrices: any) {
    const myChart = new Chart('piechart', {
      type: 'line',
      data: {
        labels: indices,
        datasets: [
          {
            label: 'Valor de fechamento',
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
    return myChart;
  }
}
