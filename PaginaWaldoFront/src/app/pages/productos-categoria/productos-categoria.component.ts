import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from '../../components/card-item/card-item.component';

@Component({
  selector: 'app-productos-categoria',
  standalone: true,
  imports: [CommonModule, CardItemComponent, RouterModule],
  templateUrl: './productos-categoria.component.html',
  styleUrl: './productos-categoria.component.scss'
})
export class ProductosCategoriaComponent {
  categoriProducts!: any;
  allProducts: any[] = [];
  allProductsCategory: any[] = [];
  titleSubCategory: string = "";
  categoryId: string | null = null;
  groupedProducts: { [key: string]: any[] } = {};
  
  subCategoriesProducts : any[] = [] 
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Escucha los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
       if (this.categoryId) {
        // Llama al servicio para obtener datos por categoría
        this.productService.getCompleteCategoryById(this.categoryId).subscribe(response => {
          if (response) {
            this.categoriProducts = response;
            this.titleSubCategory = ''; // Limpia el título de subcategoría si no hay subcategoría seleccionada
            this.allProducts = []; // Limpia la lista de productos si no hay subcategoría seleccionada
            console.log(this.categoriProducts)
            this.categoriProducts.subCategorias.forEach((element: any) => {
              console.log("element")
              console.log(element)
              element.productos.forEach((x: any) => {
                let product = {
                  codigo: x.codigo,
                  descripcion: x.descripcion,
                  id: x.id,
                  imgProduct: this.createImageFromByteArray(x.imgProduct),
                  nombre: x.nombre,
                  precio: x.precio,
                  stock: x.stock,
                  subCategoriaId: x.subCategoriaId
                }
                this.allProductsCategory.push(product)
              })  
              

            });
            this.groupProductsByType();
            console.log("category elements")
            console.log(this.allProductsCategory)
          }
        });
      }
    });
  }

  groupProductsByType() {
    console.log("grouped products function")
    console.log(this.allProductsCategory)
    this.allProductsCategory.forEach((product) => {
      console.log(product)
      const tipoDescripcion = this.categoriProducts.subCategoriaId.find((x: { id: any; }) => x.id == product.subCategoriaId);
     
      if (!this.groupedProducts[tipoDescripcion]) {
        this.groupedProducts[tipoDescripcion] = [];
        
      }

      this.groupedProducts[tipoDescripcion].push(product);
    });
  }

  getTypes(): string[] {
    console.log(this.groupedProducts)
    return Object.keys(this.groupedProducts);
  }
  createImageFromByteArray(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
