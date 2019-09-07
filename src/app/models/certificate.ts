export interface Certificate {
  id: number;
  serialNumber: string;
  issuer: string;
  subject: string;
  ca: boolean;
  type: string;
  issuedAt: string;
  expiringAt: string;


  revoked: boolean;
  revokedAt: string;
  evokeReason: string;
}
