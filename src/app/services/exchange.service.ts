import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getExchangeById(exchangeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${exchangeId}`);
  }

  proposerExchange(rcvUserId: string, rcvObjectId: string, prpObjectId: string): Observable<any> {
    const body = { rcvUserId, rcvObjectId, prpObjectId };
    return this.http.post(`${this.apiUrl}/proposed`, body);
  }

  acceptExchange(exchangeId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${exchangeId}/accept`, {});
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

}
