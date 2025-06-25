import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { OrderItem } from '../models/request/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3001/api/AddOrders';

  constructor(private http: HttpClient) {}

  agregarOrden(items: OrderItem[]): Observable<any> {
    return this.http.post(this.apiUrl, { items });
  }
}
