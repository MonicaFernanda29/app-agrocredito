import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = [
  {
    nombre: 'Producto Ejemplo',
    precio: 20,
    cantidad: 1,
    imagen: 'https://via.placeholder.com/100' // Imagen temporal
  },
  {
    nombre: 'Otro Producto',
    precio: 45,
    cantidad: 2,
    imagen: 'https://via.placeholder.com/100'
  }
];


  aumentar(i: number) {
    this.carrito[i].cantidad++;
  }

  disminuir(i: number) {
    if (this.carrito[i].cantidad > 1) this.carrito[i].cantidad--;
  }

  eliminar(i: number) {
    this.carrito.splice(i, 1);
  }

  obtenerSubtotal(): number {
  return this.carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
}

}
