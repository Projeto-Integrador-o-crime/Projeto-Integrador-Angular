import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatExpansionModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  panelOpenState = false;
}
