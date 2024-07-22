import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_NAME } from '../constants/app.constants';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public userInfo: User | null = null;
  public userFetched: boolean = false;

  constructor(private userService: UserService) { }

  isConnected(): boolean {
    return localStorage.getItem(TOKEN_NAME) ? true : false;
  }

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

  getUserInfo(): void {
    this.userService.getUserProfil(this.getUserIdFromToken() || '').subscribe(
      (user: any) => {
        this.userInfo = user.user;
        this.userFetched = true;
        console.log('User', this.userInfo);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}
