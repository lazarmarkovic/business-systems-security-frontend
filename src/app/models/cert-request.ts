export interface CertRequest {
  issuerName: string;

  commonName: string;
  organizationUnit: string;
  organization: string;
  country: string;

  certificateType: string;
}
