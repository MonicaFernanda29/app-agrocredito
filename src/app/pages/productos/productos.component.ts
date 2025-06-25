import { Producto } from '../../core/models/response/Producto.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../core/services/order.service';
import { OrderItem } from '../../core/models/request/order-item.model';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private http: HttpClient,
    private orderService: OrderService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarAlCarrito(producto: Producto): void {
    const item: OrderItem = {
      productid: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      quantity: 1,
    };

    this.carritoService.agregarProducto(item);
    alert('🛒 Producto agregado al carrito');
  }
}
