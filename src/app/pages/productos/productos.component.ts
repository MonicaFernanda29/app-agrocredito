import { Producto } from '../../core/models/response/Producto.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService} from '../../core/services/producto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
