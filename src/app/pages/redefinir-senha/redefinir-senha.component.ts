import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.scss'
})
export class RedefinirSenhaComponent {
  // API injeção
  constructor(private apiService: ApiService) { }
  #fb = inject(FormBuilder);

  public isPasswordReseted: boolean = false;
  public errorEmail: string = '';
  public erroPassword: string = '';
  public getRedefinirSenhaError = this.apiService.getRedefinirSenhaError;

  // forumulario
  public profileForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required]],
  });

  // Tratamento de erro Front
  public validateData(event: any, name: string) {
    if (!event.target.value) {
      switch (name) {
        case 'email':
          this.errorEmail = 'Preencher o campo ' + name;
          break;

        case 'nova senha':
          this.erroPassword = 'Preencher o campo ' + name;
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case 'email':
          this.errorEmail = '';
          break;

        case 'nova senha':
          this.erroPassword = '';
          break;

        default:
          break;
      }
    }
  }

  // função para enviar dados
  public submit() {
    this.isPasswordReseted = false;

    if (this.profileForm.valid) {
      const body = {
        email: this.profileForm.get('email')?.value?.toLocaleLowerCase(),
        newPassword: this.profileForm.get('newPassword')?.value,
      };

      this.apiService.httpRedefinirSenhaUser$(body).subscribe((res) => {
        this.isPasswordReseted = true;
      });
    }
  }
}
