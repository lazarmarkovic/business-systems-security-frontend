import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

import { User} from '../models/user/user';
import {UserRegisterRequest} from '../models/user/user-register-request';
import {UserPermissionsUpdateRequest} from '../models/user/user-permissions-update-request';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly path = environment.baseUrl + '/api/users';

  constructor(private http: HttpClient) {
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(this.path + `/${id}`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.path);
  }

  register(userRegisterRequest: UserRegisterRequest): Observable<User> {
    return this.http.post<User>(this.path, userRegisterRequest);
  }

  updatePermissions(id: number, userPermissionsUpdateRequest: UserPermissionsUpdateRequest): Observable<User> {
    return this.http.put<User>(this.path + `/${id}/permissions`, userPermissionsUpdateRequest);
  }
}
