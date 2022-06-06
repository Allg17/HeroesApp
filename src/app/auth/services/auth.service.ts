import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuarios.interface';
import { Observable, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user: Usuario | undefined;
  constructor(private http: HttpClient) { }
  get auth() {
    return { ...this._user }
  }

  Verificar(): Observable<boolean> {
    const id = localStorage.getItem('token');
    if (!id) {
      return of(false);
    }

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`)
      .pipe(
        map(auth => {
          this._user = auth;
          return auth.id > 0;
        })
      )
  }

  login(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(res => this._user = res),
      tap(res => localStorage.setItem('token', res.id.toString()))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
