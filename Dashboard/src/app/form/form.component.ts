import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Component, OnInit } from '@angular/core';
import { Acoes } from '../shared/interfaces/acoes.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  acoes: Acoes = {
    id: 5,
    symbol: 'test3',
    price: 80.3,
    date: '10/10/2010',
    quantidade: 20,
  };
  constructor(
    private carteira: CarteiraService,
  ) { }

  ngOnInit(): void {
  }

  createTicker() {
    this.carteira.createTicker(this.acoes).subscribe(() => {
      this.carteira.showMessage('Ação adicionada com sucesso!');
    });
  }
}
