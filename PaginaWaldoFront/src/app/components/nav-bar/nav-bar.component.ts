import { AfterContentInit, AfterRenderRef, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CartShoppingService } from '../../services/cart-shopping/cart-shopping.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule, HttpClientModule, ShoppingCartComponent],
  providers:[AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit,OnDestroy {
  subCategories: any[] = [];
  currentUser: string | null = null;
  categories: any[] = [];
  groupedSubCategories: { [key: string]: any[] } = {};
  private userSubscription: Subscription | undefined;

  // Estado para controlar la visibilidad del carrito
  isCartVisible: boolean = false;
  carritoItems: any[] = [];
  sessionId: string;
  constructor(
    private router: Router,
    public authService: AuthService,
    private productService: ProductService,
    private shoppingCartService: CartShoppingService,
    private userService: UserService
  ) {
    this.sessionId = localStorage.getItem('sessionId')!
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      console.log('Usuario actualizado:', user);
      this.currentUser = user;
    });
    this.shoppingCartService.carrito$.subscribe(items => {
      this.carritoItems = items;
    });

    this.shoppingCartService.obtenerCarrito(this.sessionId);

    this.productService.getCategories().subscribe(response => {
      this.categories = response;

      this.productService.getSubCategories().subscribe(subCategories => {
        this.subCategories = subCategories;
        this.groupCategoriesByType();
        
      });
    });

    this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Navegación
  NavigateHome() {
    this.router.navigate(['/']);
  }

  NavigateAdmin() {
    this.router.navigate(['/administracion']);
  }

  // Agrupar categorías por tipo
  groupCategoriesByType() {
    this.subCategories.forEach((subCategorie) => {
      const tipoDescripcion = this.categories.find(x => x.id == subCategorie.tipoProductoId).descripcion;

      if (!this.groupedSubCategories[tipoDescripcion]) {
        this.groupedSubCategories[tipoDescripcion] = [];
      }

      this.groupedSubCategories[tipoDescripcion].push(subCategorie);
    });
  }

  getTypes(): string[] {
    return Object.keys(this.groupedSubCategories);
  }

  // Método para alternar la visibilidad del carrito
  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }
 
  logout() {
    this.userService.clearUser();
    this.currentUser = null;
    this.authService.logout()
    // Puedes redirigir al usuario a la página de login o al inicio
  }
}
