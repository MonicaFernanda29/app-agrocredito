import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CarritoService } from '../../core/services/carrito.service';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../core/models/request/order-item.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: OrderItem[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carrito.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  }

  eliminarItem(productid: string): void {
    this.carritoService.eliminarProducto(productid);
    this.cargarCarrito();
  }

  finalizarCompra(): void {
    if (this.carrito.length === 0) {
      alert('🛒 El carrito está vacío');
      return;
    }

    this.http.post('http://localhost:3000/api/AddOrders', { items: this.carrito }).subscribe({
      next: (res) => {
        alert('✅ Orden creada con éxito');
        this.carritoService.vaciarCarrito();
        this.cargarCarrito();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al crear la orden');
      }
    });
  }
}
