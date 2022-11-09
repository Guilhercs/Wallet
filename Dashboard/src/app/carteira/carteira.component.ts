import { AlphaVantageService } from './../shared/services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss'],
})
export class CarteiraComponent implements OnInit {
  myChart!: Chart;
  myGroup: FormGroup<{ firstName: FormControl<any> }>;

  constructor(private alpha: AlphaVantageService) {
    this.myGroup = new FormGroup({
      firstName: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.updateChart();
    this.getData()
  }

  updateChart() {
    this.renderPieChart();
  }

  getData() {
    this.alpha.walletDB().subscribe(res => {
      console.log(res);
    })
   }

  renderPieChart() {
    this.myChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["TAEE4", 'WEGE3', 'KLBN4', 'ITUB3', 'VALE3', 'ITSA4'], //nome da ação
        datasets: [
          {
            label: `Distribuição`,
            data: [100, 80, 300, 200, 50, 300],
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
