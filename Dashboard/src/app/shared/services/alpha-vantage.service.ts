import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}
  //60JY37XTRGIVVERU
  //VQGI1R310X8XHD7G
  apiKey = '60JY37XTRGIVVERU';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED`;
  EXCHANGE = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=`;
  BASEURL = 'http://localhost:4567/'
  DBWALLET = 'http://localhost:3001/acoes'
  TIME_SERIES_DAILY_FULL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED'


  getSeriesFull(symbol: string): Observable<any> {
    return this.http.get<any>(
      `${this.TIME_SERIES_DAILY}&symbol=${symbol}&outputsize=full&apikey=${this.apiKey}`
    );
  }

  getData(symbol: string): Observable<any> {
    return this.http.get<any>(
      `${this.OVERVIEW}&symbol=${symbol}&apikey=${this.apiKey}`
    );
  }

  getSeries(symbol: string): Observable<any> {
    return this.http.get<any>(
      `${this.TIME_SERIES_DAILY}&symbol=${symbol}&apikey=${this.apiKey}`
    );
  }

  getExchange(x: string, y: string): Observable<Object> {
    return this.http.get<Object>(
      `${this.EXCHANGE}${x}&to_currency=${y}&apikey=${this.apiKey}`
    );
  }
  backend(): Observable<any> {
   return this.http.get<any>(`${this.DBWALLET}`)
  }

  // //Batendo na API DDM através do meu servidor
  // walletDB(ticker: string): Observable<any> {
  //   return this.http.get<any>(`${this.BASEURL}quotes?ticker=${ticker}`);
  // }

  companies():Observable<any> {
    return  this.http.get(`${this.BASEURL}companies`);
  }

}
