import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { ProductCart } from '../models/productcart.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private fs: AngularFirestore, private as: AuthService) {}
  addToCart(data: ProductCart) {
    return this.fs.collection(`users/${this.as.userId}/cart`).add(data);
  }
  getCart() {
    return this.fs.collection(`users/${this.as.userId}/cart`).snapshotChanges();
  }
  delete(id: string) {
    return this.fs.doc(`users/${this.as.userId}/cart/${id}`).delete();
  }
  save(id: string, amount: number) {
    return this.fs.doc(`users/${this.as.userId}/cart/${id}`).update({ amount });
  }
}
