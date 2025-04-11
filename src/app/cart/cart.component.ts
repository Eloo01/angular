import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getItems();
  }

  increase(item: any) {
    this.cartService.updateQuantity(item.id, 1);
    this.refreshCart();
  }

  decrease(item: any) {
    this.cartService.updateQuantity(item.id, -1);
    this.refreshCart();
  }

  remove(item: any) {
    this.cartService.removeItem(item.id);
    this.refreshCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}


