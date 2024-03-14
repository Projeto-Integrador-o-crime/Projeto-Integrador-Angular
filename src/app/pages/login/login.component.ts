import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  #fb = inject(FormBuilder);

  public errorEmail: string = '';
  public erroPassword: string = '';

  // forumulario
  public profileForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  // Tratamento de erro Front
  public validateData(event: any, name: string) {
    if (!event.target.value) {
      switch (name) {
        case 'email':
          this.errorEmail = 'Preencher o campo ' + name;
          break;

        case 'senha':
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

        case 'senha':
          this.erroPassword = '';
          break;

        default:
          break;
      }
    }
  }

  // função para enviar dados
  public submit() {
    if (this.profileForm.valid) {
      console.log(
        `email: ${this.profileForm.get('email')?.value}`,
        `Senha: ${this.profileForm.get('password')?.value}`,
        `Lembre-de-mim: ${this.profileForm.get('rememberMe')?.value}`
      );
    }
  }
}
