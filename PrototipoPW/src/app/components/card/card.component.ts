import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContactProductComponent } from '../contact-product/contact-product.component';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ContactProductComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() imgSrc!: string;
  @Input() title!:string;
  @Input() description!: string;
  logedUser: string | null = null;
  constructor(private userService: UserService, private authService : AuthService) {
 
  }
  ngOnInit(): void {
    this.logedUser = this.authService.currentUserValue
  }
  logout(){
    this.userService.clearUser()
    this.authService.logout()
    this.logedUser = ''
  }
}
