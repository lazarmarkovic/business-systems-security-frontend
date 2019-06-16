import {CertRequest} from '../cert-request';

export class CertRequestImpl implements CertRequest{
  issuer: string;
  subject: string;
  certificateType: string;
  constructor() {}
}
