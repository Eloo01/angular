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

 
}
