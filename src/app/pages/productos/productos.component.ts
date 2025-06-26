import { Producto } from '../../core/models/response/Producto.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../core/services/order.service';
import { OrderItem } from '../../core/models/request/order-item.model';
import { CarritoService } from '../../core/services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  terminoBusqueda: string = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly http: HttpClient,
    private readonly orderService: OrderService,
    private readonly carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data; // Inicialmente mostrar todos
    });
  }

  buscarProductos(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(termino) || p.descripcion.toLowerCase().includes(termino)
    );
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
