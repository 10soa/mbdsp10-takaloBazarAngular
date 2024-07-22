import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${API_URL}/reports`;

  constructor(private http: HttpClient) {}

  reportObject(objectId: number, reason: string): Observable<any> {
    const report = { object_id: objectId, reason };
    return this.http.post<any>(this.apiUrl, report);
  }
}
