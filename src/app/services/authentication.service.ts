import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { UserService } from './user.service';
import { LocalStorageUser } from '../models/user/local-storage-user';
import { LoginResponse } from '../models/user/login-response';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly loginPath = environment.baseUrl + '/api/auth/login';

  public localUser = null;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  login(email: string, password: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(
        this.loginPath,
        JSON.stringify({ email, password }),
        { headers }
      ).pipe(
        switchMap((loginResponse: LoginResponse) => {
          const token = loginResponse && loginResponse.token;
          const userId: number = loginResponse && loginResponse.userId;
          if (token) {
            const lStorage: LocalStorageUser = {
              user: null,
              token,
            };
            localStorage.setItem('currentUser', JSON.stringify(lStorage));
          }
          if (userId) {
            return this.userService.get(userId)
              .pipe(
                map(userResponse => {
                  const lStorage: LocalStorageUser = this.getCurrentUser();
                  lStorage.user = userResponse;
                  localStorage.setItem('currentUser', JSON.stringify(lStorage));
                  this.localUser = userResponse;
                  return userResponse;
                }));
          } else {
            return EMPTY;
          }
        }),
        catchError((error: any) => {
          return throwError(error);
        }));
  }

  getToken(): string {
    const currentUser = this.getCurrentUser();
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  getCurrentUser() {
    const user: LocalStorageUser = JSON.parse(
      localStorage.getItem('currentUser')
    );
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  isAuthority(authority: string): boolean {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return false;
    }

    if (currentUser.user && currentUser.user.userAuthorities) {
      return (
        currentUser.user.userAuthorities.find(a => a.name === authority) !==
        undefined
      );
    }

    return false;
  }
}
