import { DadosDeMercadoService } from './../shared/services/ddm.services/dados-de-mercado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boletim-focus',
  templateUrl: './boletim-focus.component.html',
  styleUrls: ['./boletim-focus.component.scss'],
})
export class BoletimFocusComponent implements OnInit {
  data: any;
  displayedColumns = ['indicador', 'previsao', 'boletim', 'registro', 'ultimo'];
  constructor(private dados: DadosDeMercadoService) {}

  ngOnInit(): void {
    this.getMacro();
  }

  getMacro() {
    this.dados.getMacro().subscribe((res) => (this.data = res));
  }
}
