import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';
import { DashboardMainComponent } from '../../components/dashboard-main/dashboard-main.component';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GraficsDashboardComponent } from '../../components/grafics-dashboard/grafics-dashboard.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    TableComponent,
    TableProductsComponent,
    DashboardMainComponent,
    RouterLink,
    MatSidenavModule,
    GraficsDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Variáveis.
  public isTableUserOpen = false;
  public isTableProductsOpen = false;
  public isDashboardOpen = false
  public isLoggedIn: boolean | null = null;
  public idUser: string | null = null;

  public nameUser: string = '';
  public showFiller = false;
  public mainContentGrafic = true;
  
  public readonly panelOpenState = signal(false);

  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.fetchUserData();
  }

  // Preenche as variaveis com os Dados do Local Storage 
  public fetchUserData() {
    // Obter o ID do usuário do localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.idUser = userData.id;
    }
    if (!this.idUser) {
      return;
    }

    // Fazer a chamada à API para obter os dados do usuário.
    const id = this.idUser

    this.apiService.httpListByidUser$(id).subscribe((res) => {
      this.nameUser = res.name;
    });
  }

  // Dependendo do Parametro Altera a Tela Principal.
  public openTable(params: string) {
    switch (params) {
      case 'tableUser':
        this.isTableUserOpen = true;
        this.isTableProductsOpen = false;
        this.mainContentGrafic = false;
        break;

      case 'tableProducts':
        this.isTableProductsOpen = true;
        this.isTableUserOpen = false;
        this.mainContentGrafic = false;
        break;

      case 'graficContent':
        this.mainContentGrafic = true;
        this.isTableUserOpen = false;
        this.isTableProductsOpen = false;
        break;

      default:
        break;
    }
  }
}
