import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [

   {path:"",component:HomeComponent},

   { path: 'cart',component:CartComponent },

   {path: 'checkout',component:CheckoutComponent}

   


];
