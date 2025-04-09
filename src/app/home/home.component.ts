import { Component } from '@angular/core';
import { ToolsService } from '../tools.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public tools:ToolsService){
  this.AllCategories()
  this.Allproducts()
}

public Categories:any;
public allProducts:any;

AllCategories(){
this.tools.getAllCategories().subscribe((data:any)=>this.Categories=data)
}

Allproducts(){
  this.tools.getAllProducts().subscribe((data:any)=>this.allProducts=data)
  }
}
