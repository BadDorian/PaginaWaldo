import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent,HttpClientModule, ],
  providers:[AuthService,ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'PrototipoPW';

  
}

