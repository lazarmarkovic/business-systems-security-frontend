import {Certificate} from '../certificate/certificate';

export class CertificateImpl implements Certificate {
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
  revokeReason: string;
  constructor() {}
}
