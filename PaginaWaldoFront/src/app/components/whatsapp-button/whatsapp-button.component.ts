import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {
  @Input() imgSrcWsp!: string;
  whatsappLink: string = '';
  cart$ = this.cartService.cart$;
  constructor(private cartService: ShoppingCartService) {}
}



