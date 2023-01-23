import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acoes } from '../shared/interfaces/acoes.interface';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.scss']
})
export class DeletarComponent implements OnInit {
  acoes: Acoes = {
    id: 0,
    symbol: "",
    price: undefined,
    date: [""],
    quantidade: undefined,
  }

  constructor( private router: Router,
    private route: ActivatedRoute,
    private carteira: CarteiraService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.carteira.getId(id!).subscribe(acoes => {
      console.log(acoes);
      this.acoes = acoes
    })
  }

  deletarAcao(): void {
    this.carteira.deletar(this.acoes.id).subscribe(() =>{
      this.carteira.showMessage('Produto deletado com sucesso!');
      this.router.navigate(['/carteira']);
    });
}

  cancelar(): void {
    this.router.navigate(['/carteira'])
  }
}
