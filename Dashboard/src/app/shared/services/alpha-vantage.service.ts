import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}

  apiKey = 'VQGI1R310X8XHD7G';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ITSA4.SA&apikey=${this.apiKey}`

  getData(symbol: string): Observable<any> {
    symbol = 'PBR'
    return this.http.get<any>(`${this.OVERVIEW}&symbol=${symbol}&apikey=${this.apiKey}`)
  }

  getSeries(symbol: string): Observable<any> {
    symbol = 'PETR3.SA'
    return this.http.get<any>(`${this.TIME_SERIES_DAILY}&symbol=${symbol}&apikey=${this.apiKey}`).pipe(
      tap((res: any) => {
      })
    )
  }
}
