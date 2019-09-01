import {CertRequest} from '../cert-request';

export class CertRequestImpl implements CertRequest {
  issuerName: string;

  commonName: string;
  organizationUnit: string;
  organization: string;
  country: string;

  certificateType: string;
  constructor() {}
}
