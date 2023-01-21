import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import * as firebase from '@firebase/auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId: string = '';
  userObservable!: Observable<firebase.User | null>;
  constructor(private afAuth: AngularFireAuth) {
    this.userObservable = afAuth.user;
  }
  signup(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  login(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return from(this.afAuth.signOut());
  }
}
