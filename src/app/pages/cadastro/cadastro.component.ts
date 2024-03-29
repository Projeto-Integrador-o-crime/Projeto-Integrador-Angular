import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  // API
  #apiService = inject(ApiService);

  ngOnInit(): void {
    this.#apiService.httpListUser$().subscribe((res) => {
      // console.log(res);
    });
  }

  #fb = inject(FormBuilder);

  public errorName: string = '';
  public errorEmail: string = '';
  public erroPassword: string = '';
  public erroRepeatPassword: string = '';

  // forumulario
  public profileForm = this.#fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  // Tratamento de erro Front
  public validateData(event: any, name: string) {
    if (!event.target.value) {
      switch (name) {
        case 'nome':
          this.errorName = 'Preencher o campo ' + name;
          break;

        case 'email':
          this.errorEmail = 'Preencher o campo ' + name;
          break;

        case 'password':
          this.erroPassword = 'Preencher o campo ' + name;
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case 'nome':
          this.errorName = '';
          break;

        case 'email':
          this.errorEmail = '';
          break;

        case 'password':
          this.erroPassword = '';
          this.erroRepeatPassword = '';
          break;

        default:
          break;
      }
    }
  }

  // Valida se as senhas são iguais
  public validatePassword() {
    if (
      this.profileForm.get('repeatPassword')?.value !==
      this.profileForm.get('password')?.value
    ) {
      this.profileForm.get('repeatPassword')?.reset();
      this.profileForm.get('password')?.reset();
      this.erroRepeatPassword = 'As senhas digitadas não coincidem';
    }
  }

  // função para enviar dados
  public submit() {
    if (this.profileForm.valid) {
      const body = {
        name: this.profileForm.get('name')?.value,
        email: this.profileForm.get('email')?.value,
        password: this.profileForm.get('password')?.value,
      };

      this.#apiService.httpPostUser$(body).subscribe((res) => {
        // console.log(res);
      });
    }
  }
}
