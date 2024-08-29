import { Component, Input, OnInit } from '@angular/core';
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
export class CardExampleProduct1Component implements OnInit {
  

  iconWsp : string = "/assets/img/icons8-whatsapp-48.png"
  iconCart : string = "/assets/img/add_shopping_cart_16dp_5F6368_FILL0_wght400_GRAD0_opsz20.png"
  @Input() product!: any;
  producto : any 
  ngOnInit(): void {
     this.producto  = { id : this.product.id, 
      descripcion:this.product.descripcion,
      nombre : this.product.nombre,
      precio : this.product.precio,
      stock : this.product.stock,
      tipoProductoId : this.product.tipoProductoId,
      image : this.createImageFromByteArray(this.product.imgProduct),
      codigo:this.product.codigo
    }
    console.log(this.producto)
  }

  createImageFromByteArray(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
