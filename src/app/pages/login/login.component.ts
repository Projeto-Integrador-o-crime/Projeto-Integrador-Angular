import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // API injeção
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }
  #fb = inject(FormBuilder);

  public isLogged: boolean = false;
  public errorEmail: string = '';
  public erroPassword: string = '';
  public getLoginError = this.apiService.getLoginError;

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
    this.isLogged = false;

    if (this.profileForm.valid) {
      const body = {
        email: this.profileForm.get('email')?.value?.toLocaleLowerCase(),
        password: this.profileForm.get('password')?.value,
      };

      this.apiService.httpLoginUser$(body).subscribe((res) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(res));
        
        this.authService.setLoggedIn(true);
        
        this.router.navigate(['']);
      });
    }
  }
}
