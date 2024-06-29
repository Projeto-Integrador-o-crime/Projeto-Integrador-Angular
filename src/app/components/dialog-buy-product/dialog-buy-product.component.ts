import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-dialog-buy-product',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, CarouselModule, CommonModule ],
  templateUrl: './dialog-buy-product.component.html',
  styleUrl: './dialog-buy-product.component.scss'
})
export class DialogBuyProductComponent {
  isFilled: boolean = false;

  toggleHeart(): void {
    this.isFilled = !this.isFilled;
  }
}
