import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentRequest } from '../models/request/payment-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:4000/api/payment';

  constructor(private http: HttpClient) {}

    pagar(request: PaymentRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/pagar`, request);
  }
}


