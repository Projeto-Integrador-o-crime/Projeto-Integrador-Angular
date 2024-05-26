import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  idUser: string | null = null;
  nameUser: string = '';
  descricao: string = '';
  imageUrl = null;

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.fetchUserData();
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

  fetchUserData() {
    // Obter o ID do usuário do localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.idUser = userData.id;
    }
    if (!this.idUser) {
      console.log('cansei menó, cansei.')
      return;
    }

    // Fazer a chamada à API para obter os dados do usuário
    const body = {
      id: this.idUser
    };

    this.apiService.httpListByidUser$(body).subscribe((res) => {
      console.log(res);
      this.nameUser = res.name;
      this.descricao = res.description;
      this.imageUrl = res.profilePicture;
    });
  }
}
