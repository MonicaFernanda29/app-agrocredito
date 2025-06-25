import { PasswordChangeRequest } from './../models/request/password-change-request.model';
import { LoginRequest } from './../models/request/login-request.model';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/request/register-request.model';
import { AuthResponse } from '../models/response/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { UserPayload } from '../models/response/UserPayloand';
import { jwtDecode } from 'jwt-decode';
import { UserUpdateRequest } from '../models/request/user-update-request.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  registerUser(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/protected/auth/register`,
        registerRequest
      )
      .pipe(
        tap((response) => {
          this.saveToken(response.accessToken, response.refreshToken);
        })
      );
  }

  loginUser(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/protected/auth/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.saveToken(response.accessToken, response.refreshToken);
        })
      );
  }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('jwt_token', accessToken);
    localStorage.setItem('jwt_retoken', refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getUserData(): UserPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserPayload>(token);
    } catch (e) {
      console.error('Error decodificando JWT:', e);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_retoken');
  }

  actualizarPerfil(request: UserUpdateRequest): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/api/v1/users/update`, request, {
      headers,
    });
  }

  cambiarPassword(request: PasswordChangeRequest): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/api/v1/users/password`, request, {
      headers,
    });
  }
}
