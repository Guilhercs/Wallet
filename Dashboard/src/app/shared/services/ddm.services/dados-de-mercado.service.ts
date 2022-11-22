
import { Cotas } from './../../interfaces/quotes.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 @Injectable({
  providedIn: 'root'
})
export class DadosDeMercadoService {
  constructor(
    private http: HttpClient,
  ) { }
  BASEURL = 'http://localhost:4567/'

  getOverview(): Observable<any> {
    return this.http.get(`${this.BASEURL}companies`)
  }

  getMacro(): Observable<any> {
    return this.http.get(`${this.BASEURL}macro`)
  }

  getMarketRatios(ticker: string): Observable<any> {
    return this.http.get(`${this.BASEURL}indicadores?ticker=${ticker}`)
  }

  getQuotes(ticker: string): Observable<Cotas> {
    return this.http.get<Cotas>(`${this.BASEURL}quotes?ticker=${ticker}`)
  }
}
