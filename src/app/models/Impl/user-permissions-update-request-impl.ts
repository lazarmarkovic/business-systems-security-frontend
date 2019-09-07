import {UserPermissionsUpdateRequest} from '../user/user-permissions-update-request';

export class UserPermissionsUpdateRequestImpl implements UserPermissionsUpdateRequest{
  permissions: number[];
  suspended: boolean;

  constructor() {}
}
