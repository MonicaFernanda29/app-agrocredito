import { PaymentItem } from './payment-item.model';

export interface PaymentRequest {
  userId: number;
  items: PaymentItem[];
  metodo_pago: string; // tarjeta, pse, credito
}
