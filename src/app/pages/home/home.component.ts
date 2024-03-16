import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ServicosComponent } from '../../components/servicos/servicos.component';
import { SobreComponent } from '../../components/sobre/sobre.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavComponent,
    HeaderComponent,
    ServicosComponent,
    SobreComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
