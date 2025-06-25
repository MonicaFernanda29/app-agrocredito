import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
 
  imagenes: string[] = [
    'banners/banner1.png',
    'banners/banner2.png',
    'banners/banner3.jpg',
  ];

  currentIndex = 0;

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imagenes.length) % this.imagenes.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imagenes.length;
  }

  ngOnInit(): void {
    setInterval(() => this.next(), 5000);
  }
}
