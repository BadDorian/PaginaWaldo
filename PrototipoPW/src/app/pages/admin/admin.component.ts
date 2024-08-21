import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NavBarComponent,CardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  {
  selectedFile: File | null = null;
  uploadedImage: string | ArrayBuffer | null = null;
  description: string = '';
  title: string = '';
  logedUser: string = ""
  imgsrc = `/assets/img/user.png`
  isLoggedIn: boolean = false;
  constructor( private router:Router,private userService: UserService, private authService : AuthService) {
 
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      // Lógica de subida al servidor o procesamiento local.
      // Por ahora, solo mostramos la imagen en la card.
    }
  }

  logout(){
    this.userService.clearUser()
    this.authService.logout()
    this.logedUser = ''
  }
}
