import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [],
  templateUrl: './contact-button.component.html',
  styleUrl: './contact-button.component.scss'
})
export class ContactButtonComponent {
  @Input() imgSrcWsp!: string;
  whatsappLink: string = '';
  cart$ = this.cartService.cart$;
  constructor(private cartService: ShoppingCartService) {}
  
  
}
