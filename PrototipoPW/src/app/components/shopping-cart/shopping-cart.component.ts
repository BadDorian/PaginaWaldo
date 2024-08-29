import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product/product';
import { ContactButtonComponent } from '../contact-button/contact-button.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,ContactButtonComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cart$ = this.cartService.cart$;
  imgSrcWsp!: string;

  constructor(private cartService: ShoppingCartService) {}
  
  getCartItems(): Product[] {
    return this.cartService.getCartItems();
  }

  sendWhatsAppMessage() {
    const cartItems = this.getCartItems(); // Usamos el método que devuelve los productos en el carrito
    const message = this.createWhatsAppMessage(cartItems);
   
    const phoneNumber = '+56950074572'; // Reemplaza con el número de WhatsApp del vendedor
    //const message = `Hola, estoy interesado en el producto: ${this.product.type}, ${this.product.title}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }

  createWhatsAppMessage(cartItems: Product[]): string {
    let message = 'Hola, me gustaría comprar los siguientes productos:\n\n';

    cartItems.forEach(item => {
      //message += `- ${item.name} x${item.cartQuantity} - ${item.price} cada uno.\n`;
    });

    message += `\nTotal: ${this.getTotal()}`;
    return message;
  }
  removeProduct(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  hasProducts(cart: Product[]): boolean {
    return cart.length > 0;
  }
}
