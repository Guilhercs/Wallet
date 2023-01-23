import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Acoes } from './../shared/interfaces/acoes.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.scss']
})
export class AlterarComponent implements OnInit {
  acoes: Acoes = {
    id: 0,
    symbol: "",
    price: undefined,
    date: [""],
    quantidade: undefined,
  }



  constructor(private router: Router,
    private route: ActivatedRoute,
    private carteira: CarteiraService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carteira.getId(id!).subscribe(acoes => {
      this.acoes = acoes
    })
  }

  alterar() {
    this.carteira.atualizar(this.acoes).subscribe(() =>{
      this.carteira.showMessage('Produto alterado com sucesso!');
      this.router.navigate(['/carteira']);
    });
  }

  cancelar() {
    this.carteira.showMessage('Ação cancelada!');
    this.router.navigate(['/carteira']);
  }
}
