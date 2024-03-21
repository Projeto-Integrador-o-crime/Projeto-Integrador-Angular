import { Routes } from '@angular/router';

// Componentes
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Página inicial',
    component: HomeComponent,
  },
  {
    path: 'cadastro',
    title: 'Cadastre-se',
    component: CadastroComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    title: 'Página não encontada 😞',
    component: NotFoundComponent,
  },
];
