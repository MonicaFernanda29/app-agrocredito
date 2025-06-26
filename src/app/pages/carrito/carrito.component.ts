import { Router } from '@angular/router';
import { PaymentService } from './../../core/services/payment.service';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CarritoService } from '../../core/services/carrito.service';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../core/models/request/order-item.model';
import { AuthService } from '../../core/services/auth.service';
import { PaymentRequest } from '../../core/models/request/payment-request.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  carrito: OrderItem[] = [];
  total: number = 0;
  mostrarModal: boolean = false;
  metodoPago: string = '';

  constructor(
    private carritoService: CarritoService,
    private http: HttpClient,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carrito.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
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

    const user = this.authService.getUserData();
    if (!user) {
      alert('⚠️ Usuario no autenticado');
      return;
    }
    const payload = {
      userId: user.id,
      items: this.carrito,
    };

    this.http
      .post('http://localhost:3000/api/AddOrders', payload)
      .subscribe({
        next: (res) => {
          alert('✅ Orden creada con éxito');
          this.carritoService.vaciarCarrito();
          this.cargarCarrito();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error al crear la orden');
        },
      });
  }

  abrirModalPago(): void {
    this.mostrarModal = true;
  }

  procesarPago(): void {
    console.log('👉 Procesar pago ejecutado');
    this.finalizarCompra();

    const user = this.authService.getUserData();
    if (!user) {
      alert('⚠️ Usuario no autenticado');
      return;
    }

    const request: PaymentRequest = {
      userId: user.id,
      items: this.carrito,
      metodo_pago: this.metodoPago,
    };

    console.log('🧾 Payload enviado al backend:', request);

    this.paymentService.pagar(request).subscribe({
      next: (res) => {
        console.log('✅ Respuesta del backend:', res);
        alert('✅ Pago procesado con éxito');

        // Guardar datos en localStorage para mostrar en el checkout
        localStorage.setItem(
          'ultima_orden',
          JSON.stringify({
            items: this.carrito,
            total: this.total,
            orderId: res.id_pago,
          })
        );

        this.carritoService.vaciarCarrito();
        this.cargarCarrito();
        this.mostrarModal = false;

        // 👉 Redirección al componente de checkout
        this.router.navigate(['/checkout']);
      },
      error: (err) => {
        console.error('❌ Error al procesar el pago:', err);
        alert('❌ Error al procesar el pago');
      },
    });
  }

  aumentarCantidad(item: any) {
    item.quantity++;
    this.actualizarTotal();
  }

  disminuirCantidad(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.actualizarTotal();
    }
  }

  actualizarTotal() {
    this.total = this.carrito.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
  }
}
