import { Acoes } from './../../interfaces/acoes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CarteiraService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  DBWALLET = 'http://localhost:3001/acoes';
  BASEURL =  'http://localhost:4567/'

  getWallet(): Observable<any> {
    return this.http.get<Acoes>(`${this.DBWALLET}`);
  }

  getDividends(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}dividendos?ticker=${ticker}`)
  }

  getPrices(ticker: string): Observable<any> {
    return this.http.get(`${this.BASEURL}precos?ticker=${ticker}`)
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
