import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(readonly authService: AuthService) { }

  intercept(request: HttpRequest<any>, handler:HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      const clone = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return handler.handle(clone);
    }
    return handler.handle(request);
  }
}
