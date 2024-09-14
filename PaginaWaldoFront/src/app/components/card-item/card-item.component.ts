import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { StockService } from '../../services/stock/stock.service';
import { CarritoItemDto } from '../../models/carritoItemDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CartShoppingService } from '../../services/cart-shopping/cart-shopping.service';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {
  iconWsp: string = "/assets/img/icons8-whatsapp-48.png";
  iconCart: string = "/assets/img/add_shopping_cart_16dp_5F6368_FILL0_wght400_GRAD0_opsz20.png";
  @Input() product!: any;
  @Input() imgSrcCart!: string;
  @Input() isHome: boolean = true;
  cantidadProductoSeleccionado: number = 0
  constructor(
    private stockService: StockService,
    private userService : UserService,
    private shoppingCartService : CartShoppingService
  ) {}

  ngOnInit(): void {
    // Suscripción al observable de stock solo si es necesario
    this.stockService.stock$.subscribe((stockMap) => {
      const nuevoStock = stockMap.get(this.product.id);
      if (nuevoStock !== undefined) {
        this.product.stock = nuevoStock;
      }
    });

    console.log(this.userService.getUser())
    
  }

  addCarritoNew(product: Product){
    if (this.cantidadProductoSeleccionado > 0 && product.stock > 0) {
      const sessionId = localStorage.getItem('sessionId');
      var carrito : CarritoItemDto = {
        Cantidad  : this.cantidadProductoSeleccionado,
        CarritoId : 0,
        PrecioUnitario : this.product.precio,
        ProductoId : this.product.id,
        UserId : sessionId
      }
      
      this.shoppingCartService.agregarProducto(carrito).subscribe({
        next: (response) => {
          console.log('Producto agregado al carrito:', response);
          // Ajustar el stock después de agregar al carrito
          this.stockService.ajustarStock(product.id, this.cantidadProductoSeleccionado);
          this.cantidadProductoSeleccionado = 0; // Reiniciar la cantidad seleccionada después de agregar al carrito
        },
        error: (err) => {
          console.error('Error al agregar producto al carrito:', err);
        }
      });
      
    }
  }
  addQuantity(product: Product) {
    if (product.stock > 0) {
      this.cantidadProductoSeleccionado += 1;
      this.stockService.ajustarStock(product.id, 1); // Reducir el stock en tiempo real
    } else {
      console.log('No hay suficiente stock disponible.');
    }
  }
  removeQuantity(product: Product) {
    if (this.cantidadProductoSeleccionado > 0) {
      this.cantidadProductoSeleccionado -= 1;
      this.stockService.devolverStock(product.id, 1); // Devolver stock al reducir la cantidad seleccionada
    }
  }

  
}
