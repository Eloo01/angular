import { Component } from '@angular/core';
import { ToolsService } from '../tools.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public tools:ToolsService){
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

  spiciness: number = 0;
  noNuts: boolean = false;
  vegetarianOnly: boolean = false;


  applyFilters() {
    this.filteredProducts = this.allProducts.filter((item: any) => {
      const spicyMatch =
      this.spiciness === 0 || item.spiciness === this.spiciness;
      const nutsMatch = !this.noNuts || !item.nuts;
      const vegMatch = !this.vegetarianOnly || item.vegeterian;
      return spicyMatch && nutsMatch && vegMatch;
    });
  }

  resetFilters() {
    this.spiciness = 0;
    this.noNuts = false;
    this.vegetarianOnly = false;
    this.filteredProducts = [...this.allProducts];
  }
  
  selectedCategoryId: number | null = null;

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  
 
    let categoryFiltered = categoryId
      ? this.allProducts.filter((item: any) => item.categoryId === categoryId)
      : [...this.allProducts]; 
  
    this.filteredProducts = categoryFiltered.filter((item: any) => {
      const spicyMatch =
        this.spiciness === 0 || item.spiciness === this.spiciness;
      const nutsMatch = !this.noNuts || !item.nuts;
      const vegMatch = !this.vegetarianOnly || item.vegeterian;
      return spicyMatch && nutsMatch && vegMatch;
    });
  }

}
