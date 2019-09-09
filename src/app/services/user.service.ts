import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

import { User} from '../models/user/user';
import {UserRegisterRequest} from '../models/user/user-register-request';
import {UserPermissionsUpdateRequest} from '../models/user/user-permissions-update-request';
import {UserPasswordResetRequest} from '../models/user/user-password-reset-request';
import {UserUpdateRequest} from '../models/user/user-update-request';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  /* All user permissions */
  public REGISTER_USERS = 1;
  public EDIT_USER_PERMISSIONS = 2;
  public ISSUE_ROOT_CERTIFICATE = 3;
  public ISSUE_INTERMEDIATE_CERTIFICATE = 4;
  public ISSUE_USER_CERTIFICATE = 5;
  public REVOKE_ROOT_CERTIFICATE = 6;
  public REVOKE_INTERMEDIATE_CERTIFICATE = 7;
  public REVOKE_USER_CERTIFICATE = 8;
  public DISTRIBUTE_ROOT_CERTIFICATE = 9;
  public DISTRIBUTE_INTERMEDIATE_CERTIFICATE = 10;
  public DISTRIBUTE_USER_CERTIFICATE = 11;


  private readonly path = environment.baseUrl + '/api/users';

  hasAllPermissions(user: User, permissionIDs: number[]): boolean {
    const upl = user.userPermissions.length;
    const pl = permissionIDs.length;

    let assume1 = true;
    for (let i = 0; i < upl; i++) {
      let assume = false;
      for (let j = 0; j < pl; j++) {
        if (user.userPermissions[i].id === permissionIDs[j])  {
          assume = true;
        }
      }
      if (assume === false) {
        assume1 = false;
        break;
      }
    }
    return assume1;
  }

  hasAnyPermissions(user: User, permissionIDs: number[]): boolean {
    const upl = user.userPermissions.length;
    const pl = permissionIDs.length;

    for (let i = 0; i < upl; i++) {
      for (let j = 0; j < pl; j++) {
        if (user.userPermissions[i].id === permissionIDs[j])  {
          return true;
        }
      }
    }
    return false;
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

  changePassword(id: number, userPassData: UserPasswordResetRequest): Observable<User> {
    return this.http.put<User>(this.path + `/${id}/password`, userPassData);
  }

  updateInfo(id: number, userUpdateInfoData: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(this.path + `/${id}`, userUpdateInfoData);
  }
}
