import { Routes } from '@angular/router';

// Componentes
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Gaed Tech | Página inicial',
    component: HomeComponent,
  },
  {
    path: 'cadastro',
    title: 'Gaed Tech | Cadastro',
    component: CadastroComponent,
  },
  {
    path: 'login',
    title: 'Gaed Tech | Login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    title: 'Gaed Tech | Dashboard',
    component: DashboardComponent,
  },
  {
    path: 'reset-password',
    title: 'Gaed Tech | Redefinir Senha',
    component: RedefinirSenhaComponent
  },
  {
    path: 'profile',
    title: 'Gaed Tech | Meu Perfil',
    component: ProfileComponent
  },
  {
    path: '**',
    title: 'Gaed Tech |Página não encontada 😞',
    component: NotFoundComponent,
  },
];
