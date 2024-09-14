import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cartitem';
import { StockService } from '../stock/stock.service';
import { HttpClient } from '@angular/common/http';
import { CarritoItemDto } from '../../models/carritoItemDto';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService  {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  carrito: CartItem[] = [];
  cart$ = this.cartSubject.asObservable();
  private apiUrl = 'https://localhost:7283/api/Carrito';
  constructor(private stockService: StockService, private http : HttpClient) { 
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.carrito = carritoGuardado;
    this.cartSubject.next(this.carrito);
  }

  addToCarrito(carrito: CarritoItemDto): Observable<CarritoItemDto> {
    return this.http.post<CarritoItemDto>(`${this.apiUrl}/addToCarrito`,  carrito)
  }

  getCarritoByUserId(id : any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCarrito/${id}`)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeFromCarrito/${id}` )
  }


  agregarAlCarrito(product: Product, cantidad : number) {
    // Busca si el producto ya está en el carrito usando su 'id'
    const itemExistente = this.carrito.find(item => item.producto.id === product.id);
  
    if (itemExistente) {
      // Verifica si hay stock disponible usando el servicio de stock
      if (this.stockService.obtenerStock(product.id)! > 0) {
        itemExistente.cantidad = itemExistente.cantidad + cantidad;  // Incrementa la cantidad en el carrito
        this.stockService.ajustarStock(product.id, 1); // Descuenta del stock
        this.actualizarCarrito(); // Actualiza el carrito y guarda en localStorage
      } else {
        console.log('No hay suficiente stock para agregar más de este producto.');
      }
    } else {
      // Si el producto no está en el carrito y hay stock disponible
      if (this.stockService.obtenerStock(product.id)! > 0) {
        this.carrito.push({
          producto: product,
          cantidad: cantidad,
        });
        this.stockService.ajustarStock(product.id, cantidad); // Descuenta del stock
        this.actualizarCarrito(); // Actualiza el carrito y guarda en localStorage
      } else {
        console.log('No hay stock disponible para agregar este producto.');
      }
    }
  }

  removeFromCart(productId: number) {
    const productCart = this.carrito.find(p => p.producto.id === productId);
  
    if (productCart) {
      if (productCart.cantidad > 0) {
        productCart.cantidad--;
        this.stockService.devolverStock(productId, 1); // Incrementa el stock del producto

        if (productCart.cantidad === 0) {
          this.carrito = this.carrito.filter(p => p.producto.id !== productId);
        }
        
        this.actualizarCarrito();
      }
    } else {
      console.log('Producto no encontrado en el carrito.');
    }
  }

  clearCart() {
    this.carrito.forEach(item => {
      this.stockService.devolverStock(item.producto.id, item.cantidad); // Devuelve todo el stock al limpiar el carrito
    });
    this.carrito = [];
    this.actualizarCarrito();
  }

  getTotal() {
    return this.carrito.reduce((total, carrito) => total + carrito.producto.precio * carrito.cantidad, 0);
  }

  getCartItems(): CartItem[] {
    return this.carrito;
  }

  // Método centralizado para actualizar el carrito
  private actualizarCarrito() {
    this.cartSubject.next([...this.carrito]);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
