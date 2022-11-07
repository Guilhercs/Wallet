import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);
@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {
  myChart!: Chart;

  constructor() { }

  ngOnInit(): void {
    this.renderPieChart()
  }

  renderPieChart() {
    this.myChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: [1, 2, 3, 4, 5, 6], //nome da ação
        datasets: [
          {
            label: `Distribuição`,
            data: [1,2,3,40,7,8],//porcentagem
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
    return this.myChart
  }
}
