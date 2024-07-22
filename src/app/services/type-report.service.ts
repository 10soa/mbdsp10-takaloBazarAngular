import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TypeReportService {
  private apiUrl = `${API_URL}/typeReports`;

  constructor(private http: HttpClient) {}

  getTypeReports(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.typeReports)
    );
  }
}
