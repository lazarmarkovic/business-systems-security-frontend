export interface CertRequest {
  issuerSerialNumber: string;

  commonName: string;
  organizationUnit: string;
  organization: string;
  country: string;

  certificateType: string;
}
