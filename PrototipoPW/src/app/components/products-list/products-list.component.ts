import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { CardExampleProduct1Component } from '../card-example-product1/card-example-product1.component';
import { ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, CardExampleProduct1Component],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  constructor(private productService : ProductService) {}
  products : any[] = [
    
  ];
 
  groupedProducts: { [key: string]: any[] } = {};
  
  ngOnInit() {
    this.productService.getProducts().subscribe(response=> 
      {
        this.products = response
        this.groupProductsByType();
      })
  }

  groupProductsByType() {
    this.products.forEach(product => {
      const tipoDescripcion = product.tipoProducto.descripcion;
  
      if (!this.groupedProducts[tipoDescripcion]) {
        this.groupedProducts[tipoDescripcion] = [];
      }
  
      this.groupedProducts[tipoDescripcion].push(product);
    });
  }
  getTypes(): string[] {
    return Object.keys(this.groupedProducts);
  }
}
