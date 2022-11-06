import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}
  // 60JY37XTRGIVVERU
  //VQGI1R310X8XHD7G
  apiKey = '60JY37XTRGIVVERU';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY`

  getData(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.OVERVIEW}&symbol=${symbol}&apikey=${this.apiKey}`)
  }

  getSeries(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.TIME_SERIES_DAILY}&symbol=${symbol}&apikey=${this.apiKey}`)
  }
}
