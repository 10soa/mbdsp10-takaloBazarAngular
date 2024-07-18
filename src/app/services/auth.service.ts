// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient) {}

  log(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(this.authUrl+"/user/login", { username: email, password: mdp });
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.authUrl+"/logout", {});
  }
}
