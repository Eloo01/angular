import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  constructor(private router: Router, private cartService: CartService) {}
  
  formInfo = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),  
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),   
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(120)]), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,15}$/) 
    ]),
    address: new FormControl('', Validators.required), 
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{4,10}$/)
    ]),
    avatar: new FormControl('', [
      Validators.pattern(/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)  
    ]),
    gender: new FormControl('', Validators.required) 
  });



  
  register() {
    if (this.formInfo.invalid) {
   
      this.formInfo.markAllAsTouched();
      return;
    }

  
    this.cartService.signUp(this.formInfo.value).subscribe({
      next: (data: any) => {
        alert('Registration Successful');
        this.router.navigate(['profile']); 
      },
      error: (err) => {
        alert('Registration failed. Please try again.');
        console.error(err); 
      }
    });
  }


  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedChars = /^[0-9]$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault(); 
    }
  }
}




