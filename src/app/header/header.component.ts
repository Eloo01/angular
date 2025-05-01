import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

  constructor(private renderer: Renderer2) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;


    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';


    if (this.isMenuOpen) {
      this.renderer.addClass(document.body, 'menu-open');
    } else {
      this.renderer.removeClass(document.body, 'menu-open');
    }
  }
  
  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
    this.renderer.removeClass(document.body, 'menu-open');
  }
}






