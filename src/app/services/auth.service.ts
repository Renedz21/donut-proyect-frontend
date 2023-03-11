import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Session } from '../models/session.class';
import { User } from '../models/auth-request/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
  }

  saveSession(session: Session): void {
    session.authenticated = true;
    sessionStorage.setItem('access_token', JSON.stringify(session));
  }

  getSession(): Session | undefined {
    if (!sessionStorage.getItem('access_token')) {
      return undefined;
    }

    return JSON.parse(sessionStorage.getItem('access_token')!!) as Session
  }

  // tokenRefresh(request:any): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/auth/refresh`, request);
  // }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, user);
  }
}
