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

  getWallet(): Observable<any> {
    return this.http.get<Acoes>(`${this.DBWALLET}`);
  }

  createTicker(acoes: Acoes): Observable<Acoes> {
    return this.http.post<Acoes>(`${this.DBWALLET}`, acoes);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}