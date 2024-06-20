import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { ServicosComponent } from '../../components/servicos/servicos.component';
import { SobreComponent } from '../../components/sobre/sobre.component';
import { CarouselTopComponent } from '../../components/carousel-top/carousel-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { JoinUsComponent } from '../../components/join-us/join-us.component';
import { CookiesComponent } from '../../components/cookies/cookies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavComponent,
    CarouselTopComponent,
    ServicosComponent,
    SobreComponent,
    FooterComponent,
    JoinUsComponent,
    CookiesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {}

