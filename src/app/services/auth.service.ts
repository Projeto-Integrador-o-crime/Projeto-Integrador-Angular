import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  setLoggedIn(value: boolean): void {
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  // isLoggedIn: boolean = false;

  // constructor(private router: Router) { }

  // // Método para definir o estado de login
  // public setLoggedIn(value: boolean): void {
  //   this.isLoggedIn = value;
  // }

  // // Método para obter o estado de login
  // public getLoggedIn(): boolean {
  //   return this.isLoggedIn;
  // }
  
  // // Método para logout do usuário
  // public logoff(): void {
  //   this.isLoggedIn = false;
  //   localStorage.removeItem('userData');
  //   this.router.navigate(['/login']);
  // }
}
