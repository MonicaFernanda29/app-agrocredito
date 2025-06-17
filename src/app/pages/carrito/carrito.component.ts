import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = [
    {
      nombre: 'Producto Ejemplo',
      precio: 20,
      cantidad: 1,
      imagen: 'https://via.placeholder.com/100'
    },
    {
      nombre: 'Otro Producto',
      precio: 45,
      cantidad: 2,
      imagen: 'https://via.placeholder.com/100'
    }
  ];

  facturaGenerada = false;
  facturaResumen: any = null;

  aumentar(i: number) {
    this.carrito[i].cantidad++;
  }

  disminuir(i: number) {
    if (this.carrito[i].cantidad > 1) {
      this.carrito[i].cantidad--;
    }
  }

  eliminar(i: number) {
    this.carrito.splice(i, 1);
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }

  comprar() {
    this.facturaResumen = {
      cliente: 'Juanito Rodríguez',
      productos: this.carrito.map(p => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        total: p.precio * p.cantidad
      })),
      total: this.obtenerSubtotal(),
      fecha: new Date()
    };

    this.facturaGenerada = true;
    this.carrito = [];
  }

  volverAlCarrito() {
    this.facturaGenerada = false;
  }
}
