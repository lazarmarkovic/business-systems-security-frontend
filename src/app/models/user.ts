import {Authority} from './authority';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userAuthorities: Authority[];
}
