import {UserPasswordResetRequest} from '../user/user-password-reset-request';

export class UserPasswordResetRequestImpl implements UserPasswordResetRequest {
  oldPassword: string;
  newPassword: string;

  constructor() {}
}
