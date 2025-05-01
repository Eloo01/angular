import { Component } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-auth-page',
  standalone:true,
  imports: [SigninComponent,SignupComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

}
