import {RevokeRequest} from '../revoke-request';

export class RevokeRequestImpl implements RevokeRequest {

  serialNumber: string;
  reason: string;
  constructor() {}
}
