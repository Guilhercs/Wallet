import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}
  // 60JY37XTRGIVVERU
  //VQGI1R310X8XHD7G
  apiKey = 'VQGI1R310X8XHD7G';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED`
  EXCHANGE = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=`

  getData(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.OVERVIEW}&symbol=${symbol}&apikey=${this.apiKey}`)
  }

  getSeries(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.TIME_SERIES_DAILY}&symbol=${symbol}&apikey=${this.apiKey}`)
  }

  getExchange(x: string, y: string): Observable<Object> {
    return this.http.get<Object>(`${this.EXCHANGE}${x}&to_currency=${y}&apikey=${this.apiKey}`)
  }
}
