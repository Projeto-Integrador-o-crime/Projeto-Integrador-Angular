import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [MatGridListModule, MatTabsModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss',
})
export class ServicosComponent {}
