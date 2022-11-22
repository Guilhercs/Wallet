import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}
  apiKey = 'VQGI1R310X8XHD7G';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED`;
  EXCHANGE = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=`;
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
      `${this.TIME_SERIES_DAILY}&symbol=${symbol}.SA&apikey=${this.apiKey}`
    );
  }

  getExchange(x: string, y: string): Observable<Object> {
    return this.http.get<Object>(
      `${this.EXCHANGE}${x}&to_currency=${y}&apikey=${this.apiKey}`
    );
  }

}
