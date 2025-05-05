import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';  

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  
  formInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl('')
  });

  constructor(private router: Router, private cartService: CartService) {}


  register() {
    console.log('Form Data:', this.formInfo.value); 

    this.cartService.signUp(this.formInfo.value).subscribe((data: any) => {
      console.log('User Registered:', data);
      alert('Registration Successful');
      this.router.navigate(['profile']); 
    }, (error) => {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    });
  }

}


