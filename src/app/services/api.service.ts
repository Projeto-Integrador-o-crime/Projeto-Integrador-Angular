import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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
}
