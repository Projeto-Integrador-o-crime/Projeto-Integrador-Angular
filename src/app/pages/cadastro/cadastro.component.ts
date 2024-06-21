import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlreadyloggedComponent } from '../../components/alreadylogged/alreadylogged.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlreadyloggedComponent, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isRegistered: boolean = false;
  public errorName: string = '';
  public errorEmail: string = '';
  public erroPassword: string = '';
  public erroRepeatPassword: string = '';
  public getCadastroError = this.apiService.getCadastroError;

  // API
  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) { }
  #fb = inject(FormBuilder);

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

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
    this.isRegistered = false;

    if (this.profileForm.valid) {
      const body = {
        name: this.profileForm.get('name')?.value,
        email: this.profileForm.get('email')?.value?.toLocaleLowerCase(),
        password: this.profileForm.get('password')?.value,
        description: '',
        profilePicture: '',
      };

      this.apiService.httpPostUser$(body).subscribe((res) => {
        this.isRegistered = true;
        this.router.navigate(['/login']);
      });
    }
  }
}
