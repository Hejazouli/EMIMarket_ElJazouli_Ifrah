import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/productcart.model';
import { Shopping } from 'src/app/models/shopping.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: Shopping[] = [];
  ngOnInit(): void {
    this.cs.getCart().subscribe((cart) => {
      this.cartProducts = cart.map((shopping) => {
        return {
          id: shopping.payload.doc.id,
          ...(shopping.payload.doc.data() as object),
        };
      });
      console.log(this.cartProducts);
    });
  }
  constructor(private cs: CartService) {}
  getTotalPrice(prod: Shopping): number {
    if (prod.quantity && prod.price) {
      return prod.quantity * prod.price;
    } else {
      return 0;
    }
  }
  delete(i: number): void {
    this.cs.delete(`${this.cartProducts[i].id}`);
  }
  save(i: number) {
    this.cs.save(`${this.cartProducts[i].id}`, this.cartProducts[i].quantity!);
  }
}
