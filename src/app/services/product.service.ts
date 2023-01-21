import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product, ServerResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseApi = 'https://dummyjson.com/products/';
  productsChanged = new Subject<any>();
  categoriesChanged = new Subject<any>();
  products: any;
  categories: any;
  productDetailsChanged = new Subject<any>();
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.baseApi);
  }
  getProductById(id: any) {
    return this.http.get(this.baseApi + id);
    
  }
  getProductByName(query: string) {
    return this.http.get(`${this.baseApi}${query}`);
  }
  searchProduct(query: string) {
    return this.http.get(this.baseApi + 'search?q=' + query);
  }
  emitProducts() {
    this.productsChanged.next(this.products.slice());
  }
  emitCategories() {
    this.categoriesChanged.next(this.categories.slice());
  }
  getProductsByName(name: string) {
    this.http
      .get(this.baseApi + 'search?q=' + name)
      .subscribe((data: any) => {
        console.log(data);
        this.products = data.products;
        this.emitProducts();
      });
  }
  getProductsByCategory(category: string) {
    this.http
      .get(this.baseApi + 'category/' + category)
      .subscribe((data: any) => {
        console.log(data);
        this.products = data.products;
        this.emitProducts();
      });
  }
  getAllCategories() {
    this.http
      .get(this.baseApi + 'categories')
      .subscribe((data: any) => {
        console.log(data);
        this.categories = data;
        this.emitCategories();
      });
  }
}
