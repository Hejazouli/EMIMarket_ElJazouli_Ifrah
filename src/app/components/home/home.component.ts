import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ServerResponse } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:Product[]=[];
  productsObservable!:Subscription
  add:number=-1
  searchText:string=''
  ngOnInit(): void {
   
    this.ps.productsChanged.subscribe((data:any) => {
      this.products = data;
      console.log(this.products);
    });
    this.getProducts() ;
    
  }
  constructor(private ps:ProductService,private cs:CartService,private router:Router,private as:AuthService){

  }
  getProducts() {
    
    this.ps.getAllProducts().subscribe((prods:ServerResponse) => {
      this.products = prods.products;
      console.log(this.products)

     } );
  }
  addToCart(index:number){
    if(this.as.userId){
      this.add= +index;
    }else{
      this.router.navigate(['/login']);
    }
  }
  buy(quantity:any){
    let selectedProduct=this.products[this.add]
    let data={
      name:selectedProduct.title,
      desc:selectedProduct.description,
      discPourcentage:selectedProduct.discountPercentage,
      category:selectedProduct.category,
      quantity:+quantity,
      price:selectedProduct.price,
    }
    this.cs.addToCart(data).then(()=>this.add=-1)
  }
  selectProduct(id:number){
    this.router.navigate(['/product-details',id]).then();
  }

  
}
