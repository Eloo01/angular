import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 16) {
      input = input.substring(0, 16);
    }
   
    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += ' '; 
      }
      formattedInput += input[i];
    }
    event.target.value = formattedInput;
  }

  formatExpiry(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 4) {
      input = input.substring(0, 4);
    }

    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    event.target.value = input;
  }

  formatCVV(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 3) {
      input = input.substring(0, 3);
    }
    event.target.value = input; 
  }

  formatCardholderName(event: any) {
    let input = event.target.value;

    input = input.replace(/[^A-Za-z\s]/g, ''); 
    event.target.value = input;
  }
  
}
