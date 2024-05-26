import { IUser } from '../interfaces/iuser';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { ICadastro } from '../interfaces/ICadastro';
import { IEditUser } from '../interfaces/IEditUser';
import { IId } from '../interfaces/IId';

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
  #setCadastroError = signal<ICadastro | null>(null);
  get getCadastroError() {
    return this.#setCadastroError.asReadonly();
  }
  public httpPostUser$(body: any): Observable<ICadastro[]> {
    this.#setCadastroError.set(null);

    return this.#http.post<ICadastro[]>(this.#url() + `/user`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setCadastroError.set(e.error.message);
        return throwError(() => e);
      })
    )
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
  public httpLoginUser$(body: any): Observable<ILogin[]> {
    this.#setLoginError.set(null);

    return this.#http.post<ILogin[]>(this.#url() + `/login`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setLoginError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }

  // Redefinir senha
  #setRedefinirSenhaError = signal<ICadastro | null>(null);
  get getRedefinirSenhaError() {
    return this.#setRedefinirSenhaError.asReadonly();
  }
  public httpRedefinirSenhaUser$(body: any): Observable<ICadastro[]> {
    this.#setRedefinirSenhaError.set(null);

    return this.#http.post<ICadastro[]>(this.#url() + `/reset-password`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setRedefinirSenhaError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }

  // Editar Perfil usuário
  #setEditarPerfilError = signal<IEditUser | null>(null);
  get setEditarPerfilError() {
    return this.#setEditarPerfilError.asReadonly();
  }
  public httpEditUser$(body: any): Observable<IEditUser[]> {
    this.#setEditarPerfilError.set(null);

    return this.#http.put<IEditUser[]>(this.#url() + `/user/profile`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setEditarPerfilError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }

  // Listar usuário Por Id (body)
  #setListByIdError = signal<any | null>(null);
  get setListByIdError() {
    return this.#setListByIdError.asReadonly();
  }
  public httpListByidUser$(body: any): Observable<any> {
    this.#setListByIdError.set(null);

    return this.#http.post<any[]>(this.#url() + `/user-data`, body).pipe(
      catchError((e: HttpErrorResponse) => {
        this.#setListByIdError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }
}
