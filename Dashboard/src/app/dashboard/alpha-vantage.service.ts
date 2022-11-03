import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  constructor(private http: HttpClient) {}

  apiKey = 'VQGI1R310X8XHD7G';
  OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=PBR&apikey=${this.apiKey}`;
  TIME_SERIES_DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${this.apiKey}`

  getData(): Observable<any> {
    return this.http.get<any>(`${this.OVERVIEW}`).pipe(
      tap((res: any) => {
        console.log(res);
      })
    )
  }

  getSeries(): Observable<any> {
    return this.http.get<any>(`${this.TIME_SERIES_DAILY}`).pipe(
      tap((res: any) => {
        console.log(res);
      })
    )
  }
}
