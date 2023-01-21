import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ServerResponse } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  isUser: boolean = false;
  query = '';
  products: any;
  add: number = -1;
  categories: any;
  currentCategory = 'all';

  ngOnInit(): void {
    this.as.userObservable.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.as.userId = user.uid;
      } else {
        this.isUser = false;
        this.as.userId = '';
      }
    });
    this.ps.categoriesChanged.subscribe((data) => {
      this.categories = data;
    });
    this.ps.getAllCategories();
    console.log(this.categories);
  }
  constructor(
    private as: AuthService,
    private ps: ProductService,
    public router: Router
  ) {}
  toggleHeader() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.as.logout();
  }

  onSearch() {
    this.products = this.ps.getProductsByName(this.query);
  }
  getProductsByCategory(category: string) {
    console.log(category);
    this.ps.getProductsByCategory(category);
    this.currentCategory = category;
  }
  getAllProducts() {
    this.ps.getAllProducts();
    this.currentCategory = 'all';
  }

  getProducts() {
    this.ps.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.log(this.products);
    });
  }
}
