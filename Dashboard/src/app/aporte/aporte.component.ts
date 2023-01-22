
import { CarteiraService } from './../shared/services/carteira.services/carteira.service';
import { Acoes } from './../shared/interfaces/acoes.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface datas {
  date: string
}

@Component({
  selector: 'app-aporte',
  templateUrl: './aporte.component.html',
  styleUrls: ['./aporte.component.scss']
})

export class AporteComponent implements OnInit {
  acoes: Acoes = {
    id: 0,
    symbol: "",
    price: undefined,
    date: [{
      datas: "",
    }],
    quantidade: undefined,
  }


  data!: string;
  preco!: number;
  qnt!: number;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private carteira: CarteiraService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carteira.getId(id!).subscribe(acoes => {
      this.acoes = acoes
    })
  }

  aportar() {
    console.log(this.acoes);
    const price: any = this.acoes.price
    const quantidade: any = this.acoes.quantidade;
    // const data: any = this.acoes.date.concat(this.data);
    const precoMedio = (price * quantidade + this.preco * this.qnt) / (quantidade + this.qnt);
    this.acoes.price = precoMedio
    this.acoes.quantidade = quantidade + this.qnt;
    console.log(precoMedio);
    // this.acoes.date = data
    this.carteira.atualizar(this.acoes).subscribe((res: any) =>{
      this.carteira.showMessage('Produto alterado com sucesso!');
      this.router.navigate(['/carteira']);
    });
  }

  cancelar() {
    this.carteira.showMessage('Ação cancelada!');
    this.router.navigate(['/carteira']);
  }
}
