import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { FloatingButtonComponent } from "../../components/floating-button/floating-button.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { CardExampleProduct1Component } from "../../components/card-example-product1/card-example-product1.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, FloatingButtonComponent, CardComponent, CommonModule, CardExampleProduct1Component, NavBarComponent, ProductsListComponent,ShoppingCartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent  {
    iconWsp : string = "/assets/img/icons8-whatsapp-48.png"
}
