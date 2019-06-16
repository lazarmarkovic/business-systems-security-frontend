import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

import { User} from '../models/user';

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
}
