import {RevokeRequest} from '../certificate/revoke-request';

export class RevokeRequestImpl implements RevokeRequest {

  serialNumber: string;
  reason: string;
  constructor() {}
}
