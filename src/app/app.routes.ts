import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AuthPageComponent } from './auth-page/auth-page.component';


export const routes: Routes = [

   {path:"",component:HomeComponent},

   { path: 'cart',component:CartComponent },

   { path: 'checkout',component:CheckoutComponent },

   { path: 'contact',component:ContactComponent},

   {path:'auth',component:AuthPageComponent},

   { path: '**', redirectTo: 'home' }

  


  

  

   
];
