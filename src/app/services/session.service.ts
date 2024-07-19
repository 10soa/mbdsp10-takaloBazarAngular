import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_NAME } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
