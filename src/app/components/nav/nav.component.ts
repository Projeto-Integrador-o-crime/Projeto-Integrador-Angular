import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // Funcioção para acessar Meu Perfil
  public myProfile(){
    this.router.navigate(['/profile']);
  }

  //  Função para Logoff
  public doLogoff(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
