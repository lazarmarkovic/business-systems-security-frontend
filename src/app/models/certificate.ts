export interface Certificate {
  id: number;
  serialNumber: string;
  issuer: string;
  subject: string;
  ca: boolean;

  revoked: boolean;
  revokedAt: Date;
  evokeReason: string;
}
