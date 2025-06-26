import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/request/order-item.model';
import { Orden } from '../models/response/Orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:3001/api';

  constructor(private readonly http: HttpClient) {}

  agregarOrden(items: OrderItem[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddOrders`, { items });
  }

  obtenerOrdenesPorUsuario(userId: string): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.baseUrl}/orders/user/${userId}`);
  }
}
