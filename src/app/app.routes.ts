import { Routes } from '@angular/router';

import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DebuggerComponent } from './pages/debugger/debugger.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'debugger',
    title: 'debuuger-room',
    component: DebuggerComponent,
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
    path: '**',
    title: 'Página não encontada 😞',
    component: NotFoundComponent,
  },
];
