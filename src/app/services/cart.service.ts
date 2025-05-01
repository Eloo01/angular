import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';  // Sepet verilerini localStorage'da saklayacağız

  constructor(private http: HttpClient, private router: Router) {}

  // Sepet verilerini localStorage'dan yükleme
  private loadItems(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Sepet verilerini localStorage'a kaydetme
  private saveItems(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Sepetteki tüm ürünleri almak
  getItems(): any[] {
    return this.loadItems();
  }

  // Sepete yeni ürün eklemek
  addItem(product: any) {
    const items = this.loadItems();
    const existing = items.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += 1;  // Ürün zaten varsa miktarı artır
    } else {
      items.push({ ...product, quantity: 1 });  // Yeni ürün ekle
    }

    this.saveItems(items);  // Güncellenmiş veriyi kaydet
  }

  // Sepetten ürün silmek
  removeItem(id: number) {
    const items = this.loadItems().filter(i => i.id !== id);  // Silinmek istenen ürün dışındaki her şeyi al
    this.saveItems(items);  // Yeni listeyi kaydet
  }

  // Sepetteki ürünlerin miktarını güncellemek
  updateQuantity(id: number, change: number) {
    const items = this.loadItems().map(i => {
      if (i.id === id) {
        const newQty = i.quantity + change;
        if (newQty > 0) {
          i.quantity = newQty;  // Miktar artırılır veya azaltılır
        }
      }
      return i;
    }).filter(i => i.quantity > 0);  // Miktarı 0'dan büyük olan ürünleri tut

    this.saveItems(items);  // Güncellenmiş sepeti kaydet
  }

  // Sepeti temizlemek
  clearCart() {
    this.saveItems([]);  // Boş bir sepet kaydet
  }

  // Sepetteki tüm ürünlerin toplam fiyatını hesaplamak
  getTotalPrice(): number {
    const items = this.loadItems();
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);  // Her ürünün fiyatını miktarıyla çarpıp toplamını al
  }

  // Kullanıcı kaydını yapma
  signUp(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", info);  // POST isteği ile kullanıcı kaydını yap
  }

  // Kullanıcı girişini yapma
  signIn(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", info);  // POST isteği ile giriş yap
  }

  // Kullanıcıyı almak (session token kullanarak)
  getUser() {
    return this.http.get("https://api.everrest.educata.dev/auth", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("user")}` }  // Auth header ile kullanıcının bilgilerini al
    });
  }


  signOut() {
    sessionStorage.removeItem("user");  // Session'dan kullanıcıyı sil
    this.router.navigate(['home']);  // Anasayfaya yönlendir
  }
}





