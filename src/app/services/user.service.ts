// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { API_URL } from '../constants/app.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${API_URL}/user`;

  constructor(private http: HttpClient) {}

  updateUserProfile(id: string,data: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.put(`${this.userUrl}/${id}`, data,{headers});
  }

  getUserProfil(id: string | undefined): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
}
