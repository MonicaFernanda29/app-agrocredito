import { LoginRequest } from './../models/request/login-request.model';
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { RegisterRequest} from '../models/request/register-request.model';
import { AuthResponse } from "../models/response/auth-response.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly apiUrl = "http://localhost:8080";

  constructor( readonly http:HttpClient) { }

  registerUser(registerRequest:RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/protected/auth/register`,registerRequest)
    .pipe(tap(response => {this.saveToken(response.accessToken,response.refreshToken)}));
  }

  loginUser(loginRequest:LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/protected/auth/login`, loginRequest)
    .pipe(tap(response => {this.saveToken(response.accessToken,response.refreshToken)}));
  }

  saveToken(accessToken:string, refreshToken:string) {
    localStorage.setItem("jwt_token", accessToken);
    localStorage.setItem("jwt_retoken", refreshToken);
  }

  getToken():string | null {
    return localStorage.getItem("jwt_token");
  }

  isAuthenticated(): boolean{
    return !!this.getToken()
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("jwt_retoken");
  }





}