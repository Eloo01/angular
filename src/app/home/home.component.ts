import { Component } from '@angular/core';
import { ToolsService } from '../tools.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../shared/popup/popup.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule,PopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public tools:ToolsService,private cartService:CartService){
  this.AllCategories()
  this.Allproducts()
}

public Categories:any;
public allProducts:any =[];
public filteredProducts: any = [];

AllCategories(){
this.tools.getAllCategories().subscribe((data:any)=>this.Categories=data)
}

Allproducts() {
  this.tools.getAllProducts().subscribe((data: any) => {
    this.allProducts = data;
    this.filteredProducts = [...data]; 
  });
}

public spicness:string="-1"
public nuts:any=""
public vegetarian:any=""


filterFoods() {
  let spc = this.spicness === "-1" ? "" : this.spicness;

  this.tools.filterAllFoods(spc, this.nuts, this.vegetarian).subscribe((data: any) => {
    this.allProducts = data;


    if (this.selectedCategoryId) {
      this.filteredProducts = data.filter((p: any) => p.categoryId === this.selectedCategoryId);

    } else {
      this.filteredProducts = data;
    }
  });
}


reset() {
  this.nuts = "";
  this.vegetarian = ""; 
  this.spicness = "-1"; 

  this.Allproducts(); 
  this.selectedCategoryId = null;
}

  
  selectedCategoryId: number | null = null;

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  
    if (categoryId) {
      this.filteredProducts = this.allProducts.filter((p: any) => p.categoryId === categoryId);

    } else {
      this.filteredProducts = [...this.allProducts];
    }
  }
  

popupMessage: string = '';
popupVisible: boolean = false;

showPopup(message: string) {
  this.popupMessage = message;
  this.popupVisible = true;

  setTimeout(() => {
    this.popupVisible = false;
  }, 3000);
}
addToCart(product: any) {
  this.cartService.addItem(product);
  this.showPopup(`${product.name} added to cart`);
}




}
