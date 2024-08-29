import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-contact-product',
  standalone: true,
  imports: [],
  templateUrl: './contact-product.component.html',
  styleUrl: './contact-product.component.scss'
})
export class ContactProductComponent  {
  

  
  @Input() imgSrcCart!: string;
  @Input() product!: Product;

  constructor(private cartService: ShoppingCartService) {}
  
  addToCart(product: Product) {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
    }
  }
  
}
