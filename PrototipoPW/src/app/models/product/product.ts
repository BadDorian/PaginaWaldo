export interface Product {
    id: number;
    type: string; // Esto te permitirá diferenciar entre tipos de productos
    title : string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    stock:number;
    cartQuantity: number;
  }