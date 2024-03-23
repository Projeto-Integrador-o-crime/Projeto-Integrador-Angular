import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';
import { DashboardMainComponent } from '../../components/dashboard-main/dashboard-main.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, TableComponent, DashboardMainComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  panelOpenState = false;
  isTableOpen = false;
  isDashboardOpen = false

  public openDashboard(){
    if (this.isDashboardOpen) {
      this.isDashboardOpen = false;
    } else if (!this.isDashboardOpen) {
      this.isDashboardOpen = true;
    }

    if (this.isTableOpen) {
      this.isTableOpen = false;
    }
  }

  public openTable() {
    if (this.isTableOpen) {
      this.isTableOpen = false;
    } else if (!this.isTableOpen) {
      this.isTableOpen = true;
    }

    if (this.isDashboardOpen) {
      this.isDashboardOpen = false;
    }
  }

}
