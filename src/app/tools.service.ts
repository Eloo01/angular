import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(public http:HttpClient) { }

  getAllCategories(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }

  getAllProducts(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }

  filterAllFoods(spicness:any, nuts:any, veget:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${veget}&nuts=${nuts}&spiciness=${spicness}`)
  }
  
  filterCatgory(id:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }

  cart: any[] = [];

  addToCart(product: any) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
  }

  getCart() {
    return this.cart;
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
  }

  updateQty(productId: number, qty: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item && qty > 0) {
      item.qty = qty;
    }
  }

  clearCart() {
    this.cart = [];
  }
 
}
