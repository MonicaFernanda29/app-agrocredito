import { Injectable } from '@angular/core';
import { OrderItem } from '../models/request/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito_agrocredito';

  obtenerCarrito(): OrderItem[] {
    const data = localStorage.getItem(this.carritoKey);
    return data ? JSON.parse(data) : [];
  }

  agregarProducto(producto: OrderItem): void {
    const carrito = this.obtenerCarrito();
    const index = carrito.findIndex(p => p.productid === producto.productid);

    if (index > -1) {
      carrito[index].quantity += producto.quantity;
    } else {
      carrito.push(producto);
    }

    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  eliminarProducto(productid: string): void {
    const carrito = this.obtenerCarrito().filter(p => p.productid !== productid);
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  vaciarCarrito(): void {
    localStorage.removeItem(this.carritoKey);
  }
}
