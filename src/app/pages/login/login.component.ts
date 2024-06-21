import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlreadyloggedComponent } from '../../components/alreadylogged/alreadylogged.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlreadyloggedComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isLogged: boolean = false;
  public errorEmail: string = '';
  public erroPassword: string = '';
  public getLoginError = this.apiService.getLoginError;

  // API injeção
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }
  #fb = inject(FormBuilder);

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

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
