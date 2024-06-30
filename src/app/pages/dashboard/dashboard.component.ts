import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';
import { DashboardMainComponent } from '../../components/dashboard-main/dashboard-main.component';
import { TableProductsComponent } from '../../components/table-products/table-products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, TableComponent, TableProductsComponent, DashboardMainComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  panelOpenState = false;
  isTableUserOpen = false;
  isTableProductsOpen = false;
  isDashboardOpen = false

  public openTable(params: string) {
    switch (params) {
      case 'tableUser':
        this.isTableUserOpen = true;
        this.isTableProductsOpen = false;
        break;

      case 'tableProducts':
        this.isTableProductsOpen = true;
        this.isTableUserOpen = false;
        break;

      default:
        break;
    }
  }

}
