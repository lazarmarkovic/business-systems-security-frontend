import {UserRegisterRequest} from '../user/user-register-request';

export class UserRegisterRequestImpl implements UserRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  authorityId = 2;
  permissions: number[];


  constructor() {}
}
