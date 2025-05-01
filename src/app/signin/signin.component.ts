import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private cartService: CartService) {}


  login() {
    this.cartService.signIn(this.loginForm.value).subscribe((data: any) => {
      console.log("User logged in:", data);
      sessionStorage.setItem("user", data.access_token);
      alert("Login Successful");
      this.router.navigate(['profile']);
    }, (error) => {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    });
  }
}



