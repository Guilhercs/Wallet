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
    symbol: '',
    price: 0,
    date: '',
    quantidade: 0
  };
  constructor(private router: Router,
    private route: ActivatedRoute,
    private carteira: CarteiraService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carteira.getId(id!).subscribe(acoes => {
      console.log(acoes);
      this.acoes = acoes
    })
  }

  alterar() {
    this.carteira.atualizar(this.acoes).subscribe(() =>{
      this.carteira.showMessage('Produto deletado com sucesso!');
      this.router.navigate(['/carteira']);
    });
  }

  cancelar() {
    this.carteira.showMessage('Ação alterada com sucesso!');
    this.router.navigate(['/carteira']);
  }
}
