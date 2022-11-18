import { Acoes } from './../../interfaces/acoes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prices } from '../../interfaces/prices.interface';
@Injectable({
  providedIn: 'root',
})
export class CarteiraService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  DBWALLET = 'http://localhost:3001/acoes';
  BASEURL =  'http://localhost:4567/precos?'

  getWallet(): Observable<any> {
    return this.http.get<Acoes>(`${this.DBWALLET}`);
  }

  getPrices(ticker: string): Observable<Prices> {
    return this.http.get<Prices>(`${this.BASEURL}ticker=${ticker}`)
  }

  createTicker(acoes: Acoes): Observable<Acoes> {
    return this.http.post<Acoes>(`${this.DBWALLET}`, acoes);
  }

  getId(id: string): Observable<Acoes> {
    const url = `${this.DBWALLET}/${id}`;
    return this.http.get<Acoes>(url)
  }

  deletar(id: number): Observable<Acoes> {
    const url = `${this.DBWALLET}/${id}`;
    return this.http.delete<Acoes>(url);
  }

  atualizar(acoes: Acoes): Observable<Acoes> {
    const url = `${this.DBWALLET}/${acoes.id}`;
    return this.http.put<Acoes>(url, acoes);
  }
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
