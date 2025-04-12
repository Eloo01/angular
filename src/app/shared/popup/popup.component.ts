import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Bunu ekle

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule], // <-- Buraya da ekle
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  closePopup() {
    this.showChange.emit(false);
  }

  
}


