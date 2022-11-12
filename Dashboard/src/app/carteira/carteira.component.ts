import { AlphaVantageService } from './../shared/services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { __values } from 'tslib';

Chart.register(...registerables);
@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss'],
})
export class CarteiraComponent implements OnInit {
  myChart!: Chart;
  myGroup: FormGroup<{ firstName: FormControl<any> }>;
  data!: any;
  ticker: any;
  displayedColumns = ['id', 'symbol', 'price', 'quantidade'];
  qnt: any;
  soma: any;
  preco: any;
  constructor(private alpha: AlphaVantageService) {
    this.myGroup = new FormGroup({
      firstName: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart() {
    this.renderChartData();
  }

  renderChartData() {
    this.alpha.backend().subscribe((res) => {
      this.data = res;
      console.log(res);
      let data = Array(res);
      data.forEach((element: any) => {
        let ticker = Object.values(element).map((res: any) => res.symbol);
        this.renderPieChart(ticker)
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
            label: 'none',
            data: [10, 20, 30, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
