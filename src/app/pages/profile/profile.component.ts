import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';
import { ApiService } from '../../services/api.service';

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  profilePicture: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData: UserData | null = null;
  profilePictureUrl: string | null = null;
  idUser: string | null = null;
  nameUser: string = '';
  descricao: string = '';
  imageUrl = null;

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchUserData();
      }
    });
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
    const id = this.idUser

    this.apiService.httpListByidUser$(id).subscribe((res) => {
      this.nameUser = res.name;
      this.descricao = res.description;
      this.imageUrl = res.profilePicture;
    });
  }
}
