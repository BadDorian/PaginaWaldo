export interface Product {
    id: number;
    type: number; // Esto te permitirá diferenciar entre tipos de productos
    name : string;
    description: string;
    image?: string;
    price: number;
    stock:number;
    code:number;
    //cartQuantity: number;
  }