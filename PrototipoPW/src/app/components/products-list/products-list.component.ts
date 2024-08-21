import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { CardExampleProduct1Component } from '../card-example-product1/card-example-product1.component';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, CardExampleProduct1Component],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  constructor() {}
  products = [
    {id: 1, type: 'Tipo 1', title: 'Producto 1', description: 'Descripcion Producto 1', price:1000, quantity:1, cartQuantity:0,stock:3,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 2, type: 'Tipo 2', title: 'Producto 2', description: 'Descripcion Producto 2', price:2000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 3, type: 'Tipo 1', title: 'Producto 3', description: 'Descripcion Producto 3', price:3000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 4, type: 'Tipo 2', title: 'Producto 4', description: 'Descripcion Producto 4', price:4000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 5, type: 'Tipo 1', title: 'Producto 1', description: 'Descripcion Producto 1', price:5000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 6, type: 'Tipo 2', title: 'Producto 2', description: 'Descripcion Producto 2', price:6000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 7, type: 'Tipo 1', title: 'Producto 3', description: 'Descripcion Producto 3', price:7000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 8, type: 'Tipo 2', title: 'Producto 4', description: 'Descripcion Producto 4', price:3000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 9, type: 'Tipo 3', title: 'Producto 1', description: 'Descripcion Producto 1', price:2000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 10, type: 'Tipo 3', title: 'Producto 2', description: 'Descripcion Producto 2', price:1000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 11, type: 'Tipo 3', title: 'Producto 3', description: 'Descripcion Producto 3', price:5000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    {id: 12, type: 'Tipo 3', title: 'Producto 4', description: 'Descripcion Producto 4', price:4000, quantity:1,stock:3, cartQuantity:0,image: 'https://www.latercera.com/resizer/zzN969HHW2CS93-Z5e1vDh23APY=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AWE3KAW6X5COJHCBT3GDT7D5AA.png' },
    // Añade más productos según sea necesario
  ];
 
  groupedProducts: { [key: string]: Product[] } = {};
  
  ngOnInit() {
    this.groupProductsByType();
    
  }

  groupProductsByType() {
    this.products.forEach(product => {
      if (!this.groupedProducts[product.type]) {
        this.groupedProducts[product.type] = [];
      }
      this.groupedProducts[product.type].push(product);
    });
  }
  getTypes(): string[] {
    return Object.keys(this.groupedProducts);
  }
}
