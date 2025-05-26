import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/register';
import { LoginDTO } from '../models/login';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7155/api/Auth';
  public isLogged = false;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }
  syncLoginStatus(): void {
  this.isLogged = !!localStorage.getItem('token');
}

  register(data: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.isLogged = true;
        }
      })
    );
  }
  
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
}
