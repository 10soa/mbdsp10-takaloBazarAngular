// src/app/services/object.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Object } from '../models/object.model';  // Path to the model
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getUserObjects(params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/user/${params.user_id}/objects`, { params: httpParams });
  }

  getObjects(pageNo: number, pageSize: number, sortBy: string, filters: any): Observable<{ objects: Object[], totalPages: number, currentPage: number }> {
    let params = new HttpParams()
      .set('page', pageNo.toString())
      .set('limit', pageSize.toString())
      .set('order_by', 'created_at')
      .set('order_direction', sortBy);

    if (filters.name) params = params.set('name', filters.name);
    if (filters.description) params = params.set('description', filters.description);
    if (filters.category_id) params = params.set('category_id', filters.category_id.toString());
    if (filters.created_at_start) params = params.set('created_at_start', filters.created_at_start);
    if (filters.created_at_end) params = params.set('created_at_end', filters.created_at_end);

    return this.http.get<{ data: { objects: Object[], totalPages: number, currentPage: number } }>(`${this.apiUrl}/objects`, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getObject(id: number): Observable<Object> {
    return this.http.get<Object>(`${this.apiUrl}/object/${id}`);
  }

  createObject(object: any): Observable<Object> {
    return this.http.post<Object>(`${this.apiUrl}/objects`, object);
  }

  updateObject(id: number, object: any): Observable<Object> {
    return this.http.put<Object>(`${this.apiUrl}/objects/${id}`, object);
  }

  deleteObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
