import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(x =>{
      this.product = x
      console.log(this.product)
    });
    
  }
}
