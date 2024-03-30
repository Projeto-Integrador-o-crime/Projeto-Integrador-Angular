import { IUser } from '../interfaces/iuser';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // INJEÇÃO DE DEPENDENCIA
  #http = inject(HttpClient);
  #url = signal(environment.apiTask);

  // Listar usuários
  public httpListUser$(): Observable<IUser[]> {
    return this.#http.get<IUser[]>(this.#url() + `/users`);
  }

  // Cadastrar usuário
  public httpPostUser$(body: any): Observable<IUser[]> {
    return this.#http.post<IUser[]>(this.#url() + `/user`, body);
  }

  // Deletar usuário
  public httpDeleteUser$(id: string): Observable<void> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.#http.delete<void>(`${this.#url()}/user`, options);
  }

  // Login Usuário
  #setLoginError = signal<ILogin | null>(null);
  get getLoginError() {
    return this.#setLoginError.asReadonly();
  }
  public httpLoginUser$(body: any): Observable<ILogin[]>{
    this.#setLoginError.set(null);

    return this.#http.post<ILogin[]>(this.#url() + `/login`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setLoginError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }
}
