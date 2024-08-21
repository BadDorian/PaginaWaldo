import { Component, Input } from '@angular/core';
import { ContactProductComponent } from '../contact-product/contact-product.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-card-example-product1',
  standalone: true,
  imports: [CommonModule, ContactProductComponent],
  templateUrl: './card-example-product1.component.html',
  styleUrl: './card-example-product1.component.scss'
})
export class CardExampleProduct1Component {

  iconWsp : string = "/assets/img/icons8-whatsapp-48.png"
  iconCart : string = "/assets/img/add_shopping_cart_16dp_5F6368_FILL0_wght400_GRAD0_opsz20.png"
  @Input() product!: Product;
}
