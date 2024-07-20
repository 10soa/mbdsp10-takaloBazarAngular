import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError,  } from 'rxjs';
import { API_URL } from '../constants/app.constants';
import { catchError} from 'rxjs/operators';
import { User } from '../models/user.model';
import { TOKEN_NAME } from '../constants/app.constants';

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

  register(user: User): Observable<any> {
    return this.http.post(`${API_URL}/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error); // Log error to console

      // Renvoyer l'erreur pour que le composant puisse la traiter
      return throwError(() => error);
    };
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_NAME);
  }

}
