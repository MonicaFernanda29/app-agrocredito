export interface Orden {
  _id: string;
  items: {
    nombre: string;
    precio: number;
    quantity: number;
    _id: string;
  }[];
  totalPrecio: number;
  userId: string;
  Date: string;
}
