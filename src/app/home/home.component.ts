import { Component } from '@angular/core';
import { ToolsService } from '../tools.service';
import { CommonModule,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../shared/popup/popup.component';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule, PopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    public tools: ToolsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadCategories();
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      const catId = params['category'];
      this.selectedCategoryId = catId ? +catId : null;
      this.filterByCategory(this.selectedCategoryId);
    });
  }

  public Categories: any;
  public allProducts: any = [];
  public filteredProducts: any = [];

  loadCategories() {
    this.tools.getAllCategories().subscribe((data: any) => this.Categories = data);
  }

  loadProducts() {
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
    this.router.navigate([], {
      queryParams: {
        category: categoryId !== null ? categoryId : null
      },
      queryParamsHandling: 'merge'
    });

    let categoryFiltered = categoryId
      ? this.allProducts.filter((item: any) => item.categoryId === categoryId)
      : [...this.allProducts];

    this.filteredProducts = categoryFiltered.filter((item: any) => {
      const spicyMatch = this.spiciness === 0 || item.spiciness === this.spiciness;
      const nutsMatch = !this.noNuts || !item.nuts;
      const vegMatch = !this.vegetarianOnly || item.vegeterian;
      return spicyMatch && nutsMatch && vegMatch;
    });
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


  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
