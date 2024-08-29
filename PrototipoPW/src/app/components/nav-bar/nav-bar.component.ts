import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, CardComponent,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit,OnDestroy {
 
  currentUser: string | null = null;
  private userSubscription: Subscription | undefined;
  constructor(private router : Router,private userService: UserService, public authService : AuthService, private productService : ProductService) {
    
  }
  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      console.log('Usuario actualizado:', user);
      this.currentUser = user;
    });

    this.productService.getCategories().subscribe( x => {
      this.categories = x
    })
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  NavigateHome(){
    this.router.navigate(['/home'])
  }
 

  NavigateAbout(){
    this.router.navigate(['/about'])
  }

  NavigateAdmin(){
    this.router.navigate(['/admin'])
  }
  NavigateProductList(){
    this.router.navigate(['/productList'])
  }

  menuVisible = false;
  categories!: any[] 

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  selectCategory(category: any) {
    console.log('Categoría seleccionada:', category.descripcion);
    this.router.navigate(['/category', category.id])
    this.menuVisible = false; // Ocultar el menú después de seleccionar una categoría
  }
 
}
