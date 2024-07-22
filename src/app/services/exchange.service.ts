import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private apiUrl = API_URL;
  private myExchange: any[] = [];
  private dataFetched: boolean = false;

  constructor(private http: HttpClient) { }

  getExchangeById(exchangeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/exchange/${exchangeId}`);
  }

  proposerExchange(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exchange/proposed`, body);
  }

  acceptExchange(exchangeId: string,body:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/exchange/${exchangeId}/accept`, body);
  }

  rejectExchange(exchangeId: string, note: string): Observable<any> {
    const body = { note };
    return this.http.patch(`${this.apiUrl}/${exchangeId}/reject`, body);
  }

  getExchangeHistory(userId: string, page: number = 1, limit: number = 10, status: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('status', status);

    return this.http.get(`${this.apiUrl}/exchange/history/${userId}`, { params });
  }

  myCurrentExchange(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exchanges/myCurrents`);
  }

  fetchCurrentExchange()  {
    if (this.dataFetched) {
    }
    else{
      this.myCurrentExchange().subscribe(
        (data: any) => {
          console.log('Exchange History:', data);
          this.myExchange = data.data;
        },
        (error) => {
          console.error('Error fetching exchange history:', error);
        }
      );
    }
  }

  getMyExchange() : any[] {
    return this.myExchange;
  }

  getDataFetched() : boolean {
    return this.dataFetched;
  }

}
