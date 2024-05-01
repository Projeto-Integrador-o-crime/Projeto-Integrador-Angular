import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  public setLoggedIn(value: boolean): void {
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
