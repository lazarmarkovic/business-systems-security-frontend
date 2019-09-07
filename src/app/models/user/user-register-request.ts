
export interface UserRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  authorityId: number;
  permissions: number[];
}
