import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';  

  constructor(private http: HttpClient, private router: Router) {}

  
  private loadItems(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  
  private saveItems(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  
  getItems(): any[] {
    return this.loadItems();
  }

  
  addItem(product: any) {
    const items = this.loadItems();
    const existing = items.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += 1;  
    } else {
      items.push({ ...product, quantity: 1 });  
    }

    this.saveItems(items);  
  }

  
  removeItem(id: number) {
    const items = this.loadItems().filter(i => i.id !== id);  
    this.saveItems(items);  
  }

 
  updateQuantity(id: number, change: number) {
    const items = this.loadItems().map(i => {
      if (i.id === id) {
        const newQty = i.quantity + change;
        if (newQty > 0) {
          i.quantity = newQty; 
        }
      }
      return i;
    }).filter(i => i.quantity > 0);  

    this.saveItems(items);  
  }

  
  clearCart() {
    this.saveItems([]); 
  }

  
  getTotalPrice(): number {
    const items = this.loadItems();
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0); 
  }

  
  signUp(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", info); 
  }

  
  signIn(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", info);  
  }


  getUser() {
    return this.http.get("https://api.everrest.educata.dev/auth", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("user")}` } 
    });
  }


  signOut() {
    sessionStorage.removeItem("user");  
    this.router.navigate(['home']); 
  }
}





