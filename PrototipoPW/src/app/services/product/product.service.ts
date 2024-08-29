import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product/product';

export interface newProduct {
  Id : number,
  Nombre : string,
  Codigo : number,
  Precio : number,
  Stock : number,
  ImgProduct :Blob,
  Descripcion : string,
  TipoProductoId : number
}
export function xhrHeaders(){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8')
  headers.append('X-Requested-With', 'XMLHttpRequest')
  return {headers}
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7283/api/Producto';
  
  constructor(private http: HttpClient) {
    
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/createProducto`,  product)
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllProducto`)
  }
  getProductById(id : any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getProductoById/${id}`)
  }
  getProductByCategoryId(categoryId : any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getProductoByCategoryId/${categoryId}`)
  }
  update(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProducto`,  product)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteProducto/${id}` )
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCategories`)
  }
}
