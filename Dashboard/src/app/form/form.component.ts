import { Router } from '@angular/router';
import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Component, OnInit } from '@angular/core';
import { Acoes } from '../shared/interfaces/acoes.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  acoes: Acoes = {
    id: 0,
    symbol: '',
    price: 0,
    date: [''],
    quantidade: 0,
  };
  constructor(private carteira: CarteiraService, private router: Router) {}

  ngOnInit(): void {
  }

  createTicker() {
      this.carteira.createTicker(this.acoes).subscribe(() => {
        this.carteira.showMessage('Ação adicionada com sucesso!');
        this.router.navigate(['/carteira']);
      });
  }

  cancelar() {
    this.carteira.showMessage('Ação cancelada!');
    this.router.navigate(['/carteira']);
  }
}
