import {Authority} from '../authority';
import {Permission} from '../permission';
import {User} from '../user/user';

export class UserImpl implements User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userAuthorities: Authority[];
  userPermissions: Permission[];

  constructor() {}
}
