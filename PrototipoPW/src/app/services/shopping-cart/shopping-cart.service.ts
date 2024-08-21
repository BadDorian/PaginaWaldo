import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();
  constructor() { }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.cartQuantity += product.quantity;
    } else {
      product.cartQuantity += product.quantity;
      this.cart.push(product);
    }
    this.cartSubject.next([...this.cart]);
  }
  getCartItems(): Product[] {
    return this.cart;
  }
  removeFromCart(productId: number) {
    
    var productCart = this.cart.find(p => p.id == productId)
    if (productCart != undefined) {
      productCart.cartQuantity = productCart.cartQuantity - productCart.quantity
      productCart.stock = productCart.stock + productCart.quantity
      if (productCart.cartQuantity == 0 ) {
        this.cart = this.cart.filter(p => p.id !== productId);
      }
      this.cartSubject.next([...this.cart]);
    }
    
  }

  clearCart() {
    this.cart.forEach(x => {
      x.stock += x.cartQuantity
      x.cartQuantity = 0
    })
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }
  getTotal() {
    return this.cart.reduce((total, product) => total + product.price * product.cartQuantity, 0);
  }
}
