import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
   productos: any[] = [];
  total: number = 0;
  orderId: string | null = null;

  ngOnInit(): void {
    const resumen = localStorage.getItem('ultima_orden');
    if (resumen) {
      const data = JSON.parse(resumen);
      this.productos = data.items;
      this.total = data.total;
      this.orderId = data.orderId;
    }
  }

}
