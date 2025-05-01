import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) { }


  getAllCategories() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll");
  }

  getAllProducts() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll");
  }

  filterAllFoods(spicness: any, nuts: any, veget: any) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${veget}&nuts=${nuts}&spiciness=${spicness}`);
  }

  filterCategory(id: any) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`);
  }

  
  postCart(cartInfo: any) {
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", cartInfo);
  }


  allBasket() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll");
  }
}

