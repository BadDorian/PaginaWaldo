import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { Product } from '../../models/product/product';
import { ProductService } from '../../services/product/product.service';

import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NavBarComponent,CardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  selectedFile: File | null = null;
  uploadedImage: string | ArrayBuffer | null = null;
  description: string = '';
  name: string = '';
  code: number = 0;
  price : number = 0;
  stock: number = 0;
  type : number = 0;
  logedUser: string = ""
  imgsrc = `/assets/img/user.png`
  isLoggedIn: boolean = false;
  listProducts : any[] = []
  listProduct2 : any[] = []
  selectedItem: any = {  };
  constructor( private router:Router,private userService: UserService, private authService : AuthService, private productService : ProductService) {
 
  }
  ngOnInit(): void {
    this.getProductos()
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
      console.log(this.selectedFile)
      this.convertFileToBase64String(this.selectedFile).then(base64String => {
        // Aquí puedes enviar el byteArray al backend
        var producto : Product = { id : 0, 
          description:this.description,
          name : this.name,
          price : parseInt(this.price.toString()),
          stock : parseInt(this.stock.toString()),
          type : parseInt(this.type.toString()),
          image : base64String,
          code:parseInt(this.code.toString())
        }
        this.productService.create(producto).subscribe(response => 
          {
            this.getProductos()
          })
      }).catch(error => {
        console.error('Error converting file:', error);
      });
    }
  }
  getProductos(){
    this.listProducts = []
    this.productService.getProducts().subscribe(response => {
      
      response.forEach(x => {
        var producto  = { id : x.id, 
          descripcion:x.descripcion,
          nombre : x.nombre,
          precio : x.precio,
          stock : x.stock,
          tipoProductoId : x.tipoProductoId,
          image : this.createImageFromByteArray(x.imgProduct),
          codigo:x.codigo
        }
        this.listProducts.push(producto)
      })
    })
  }
  logout(){
    this.userService.clearUser()
    this.authService.logout()
    this.logedUser = ''
  }

  convertFileToBase64String(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }
  convertFileToBase64StringUpdate(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

  openEditModal(item: any) {
    
    this.selectedItem = { ...item }; // Clona el objeto para evitar cambios inmediatos en la tabla
   
  }

  updateProduct(product : any){
    const btnClose = document.getElementById('btnClose');
     
    if (this.selectedFile) {
      this.convertFileToBase64StringUpdate(this.selectedFile).then(base64String => {
        // Aquí puedes enviar el byteArray al backend
        var producto : Product = { id : product.id, 
          description:product.descripcion,
          name : product.nombre,
          price : parseInt(product.precio),
          stock : parseInt(product.stock),
          type : parseInt(product.tipoProductoId),
          image : base64String,
          code:parseInt(product.codigo)
        }
        this.productService.update(producto).subscribe( response => {
          btnClose?.click()
          this.getProductos()
        })
      }).catch(error => {
        console.error('Error converting file:', error);
      });
    }
    
    
  }

  createImageFromByteArray(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  deleteProduct(id : number){
    this.productService.delete(id).subscribe(response => {
      Swal.fire("Producto eliminado con exito!")
      this.getProductos()
    })
  }
}
