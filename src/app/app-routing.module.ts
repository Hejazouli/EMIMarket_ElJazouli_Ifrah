import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent,},
  {path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent, },
  { path: 'cart', component: CartComponent ,canActivate:[AuthGuard],},
  { path: 'product-details/:id', component: ProductDetailsComponent },
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
 

*/