// src/app/services/object.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Object } from '../models/object.model';  // Path to the model
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  getObjects(): Observable<Object[]> {
    return this.http.get<Object[]>(this.apiUrl);
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
