import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { FloatingButtonComponent } from "../../components/floating-button/floating-button.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { CardExampleProduct1Component } from "../../components/card-example-product1/card-example-product1.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { ProductService } from '../../services/product/product.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent,
     FloatingButtonComponent,
      CardComponent,
      CommonModule,
      CardExampleProduct1Component,
      NavBarComponent, 
      ProductsListComponent,
      ShoppingCartComponent,
    CommonModule,
  RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
    iconWsp : string = "/assets/img/icons8-whatsapp-48.png"
    lastProducts : any[] = []
    products : any[] = []
    constructor(private productService : ProductService) {}
  ngOnInit(): void {
     this.productService.getProducts().subscribe((data) => {
      data.forEach(x =>  {
        let product = {
          codigo: x.codigo,
          descripcion: x.descripcion,
          id: x.id,
          imgProduct: this.createImageFromByteArray(x.imgProduct),
          nombre: x.nombre,
          precio: x.precio,
          stock: x.stock,
          tipoProductoId: x.tipoProductoId,
        }
        this.products.push(product)
      })
      //this.products = data;
      this.lastProducts = this.products.slice(-3); // Obtener los últimos 3 productos
    });
     
     
  }
  createImageFromByteArray(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
 
}
