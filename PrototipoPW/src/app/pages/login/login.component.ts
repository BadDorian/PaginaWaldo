import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, CommonModule,],
  providers:[UserService,AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService, private router:Router,private userService: UserService,) {}
  
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response)=> {
        Swal.fire({
          title: "Inicio Sesion",
          text: "Inicio de sesion exitoso, Usuario: "+ response.logedUser.email,
          icon: "success"
        });
        this.userService.setUser(response.logedUser.email)
        this.router.navigate(['/admin'])
      }
        ,
      error: (err) => {
        Swal.fire({
        icon: "error",
        title: "Error al ingresar",
        text: err.error.message,
        
      })}
    });
  }

}
