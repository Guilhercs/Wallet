import { DadosDeMercadoService } from './../shared/services/ddm.services/dados-de-mercado.service';
import { DatePipe } from './../shared/pipe/date.pipe';
import { AlphaVantageService } from '../shared/services/alpha.services/alpha-vantage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stockPrices!: number[];
  dataSet: string[] = [];
  symbolName: string = 'ITUB3';
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
  data: any;
  loading!: boolean
  marketRatios!: any;
  color!: string;
  constructor(
    private alpha: AlphaVantageService,
    private datetransform: DatePipe,
    private dados: DadosDeMercadoService
  ) {}

  ngOnInit(): void {
    this.filterInput()
    this.updateData();
  }

  updateData() {
    this.converter();
    this.getCompanyOverview();
    this.getPrices(this.tempo);
    this.getMarketRatios();
    this.updateChart();
  }

  getMarketRatios(){
    let symbol = this.symbolName.toUpperCase()
    this.dados.getMarketRatios(symbol).subscribe(res => {
      let arr = Array(res);
      this.marketRatios = arr.map((res: Object[]) => res[res.length - 1]);
    })
  }

  filterInput() {
    let input, filter
    input = document.getElementById('ticker') as any;
    filter = input.value?.toUpperCase()
  }

  converter() {
    const dolar = this.alpha.getExchange(this.dol, this.brl);
    dolar.subscribe((res: any) => {
      this.resultDolar = res['Realtime Currency Exchange Rate']['8. Bid Price'];
    });
    const bitcoin = this.alpha.getExchange(this.btc, this.brl);
    bitcoin.subscribe((res: any) => {
      this.resultBtc = res['Realtime Currency Exchange Rate']['8. Bid Price'];
      console.log(this.resultBtc);
    });
  }


  updateChart() {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
  }

  getCompanyOverview() {
    let overview = this.dados.getOverview().pipe();
    overview.subscribe((data) => {
      let dados = data.find((element: any) => element['b3_issuer_code'] === this.symbolName.substring(0, 4).toUpperCase());
      this.data = Array(dados);
    });
  }

  getPrices(tempo: string) {
    const response = this.alpha.getSeries(this.symbolName);
    response.subscribe((data) => {
      console.log(data);
      let dados = data['Time Series (Daily)'];
      let dateArray: string[] = Object.keys(dados).reverse();
      let priceArray: number[] = Array(dados);
      priceArray.forEach((element: any) => {
        let price = Object.values(element)
          .map((res: any) => res['4. close'])
          .reverse();
        switch (tempo) {
          case '90':
            this.stockPrices = price.slice(10);
            this.dataSet = dateArray.slice(10);
            this.updateChart();
            alert('Para melhor visualização do gráfico, use o modo paisagem')
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

  renderChart(dataSet: any, stockPrices: any, symbol: string) {
    let color = ''
    const ultimo = stockPrices[stockPrices.length -1];
    const primeiro = stockPrices[0];
    const value = primeiro - ultimo;
    color = value > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(46, 138, 138, 0.5)';
    let label = symbol.toUpperCase();
    this.myChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: dataSet,
        datasets: [
          {
            label: `Valor da ${label}`,
            data: stockPrices,
            backgroundColor: color,
            borderColor: color,
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
