import {CertRequest} from '../certificate/cert-request';

export class CertRequestImpl implements CertRequest {
  issuerSerialNumber: string;

  commonName: string;
  organizationUnit: string;
  organization: string;
  country: string;

  certificateType: string;
  constructor() {}
}
