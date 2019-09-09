import {Authority} from '../authority';
import {Permission} from '../permission';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userAuthorities: Authority[];
  userPermissions: Permission[];
  suspended: boolean;

}
