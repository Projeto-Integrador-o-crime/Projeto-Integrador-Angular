import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  // Varáveis
  apiKey: string = 'e8fd7ca6417479482154b280ab46d204';
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  idUser: string | null = null;
  nameUser: string = '';
  descricao: string = '';
  imageUrl = null;
  
  public fillPicture = this.selectedFile;

  // API
  constructor(private apiService: ApiService, private http: HttpClient) { }
  #fb = inject(FormBuilder);

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.idUser = userData.id;
    }
    if (!this.idUser) {
      return;
    }

    // Chamar a função para buscar os dados do usuário
    this.fetchUserData();
  }

  // forumulario
  public profileEditForm = this.#fb.group({
    profilePicture: [''],
    name: ['', [Validators.required]],
    descricao: [''],
  });

  onFileChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  fetchUserData() {
    // Fazer a chamada à API para obter os dados do usuário
    const id = this.idUser

    this.apiService.httpListByidUser$(id).subscribe((res) => {
      this.profileEditForm.patchValue({
        name: res.name,
        descricao: res.description,
      });

      this.selectedImage = res.profilePicture;
    });
  }

  // função para enviar dados
  public submit(): void {
    if (this.profileEditForm.valid) {
      const body = {
        id: this.idUser?.toString(),
        name: this.profileEditForm.get('name')?.value,
        description: this.profileEditForm.get('descricao')?.value,
        profilePicture: this.selectedImage,
      };

      this.apiService.httpEditUser$(body).subscribe((res) => {
        window.location.reload();
      });
    }
  }
}
