import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email : string = "" ;
  password :string = "";
  constructor(private authService: AuthService, private router:Router) {
    
  }

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(['/']),
      error: (err) => alert("Error al registrar, " + err)
    });
    
  }

  NavigateLogin(){
    this.router.navigate(['/'])
  }
}
