import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-carousel-top',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel-top.component.html',
  styleUrl: './carousel-top.component.scss'
})
export class CarouselTopComponent {
  myInterval = 9500;
}
