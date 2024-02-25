import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../Models/Login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../Models/Login-response.model';
import { environment } from 'src/environment/environment';
import { User } from '../Models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../Models/register.mode';
import { RegisterResponse } from '../Models/user-register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  controller = "Auth";
  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}${this.controller}/login`, {
      email: request.email,
      password: request.password
    });
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.controller}/register`, request);
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
    localStorage.setItem('company-id', user.companyId);
  }

  User(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    const companyId = localStorage.getItem('company-id');

    if (email && roles && companyId) {
      const user: User = {
        email: email,
        roles: roles.split(','),
        companyId: companyId
      };
      return user;
    }

    return undefined;
  }
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
