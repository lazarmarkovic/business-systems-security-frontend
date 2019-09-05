import {Certificate} from '../certificate';

export class CertificateImpl implements Certificate {
  id: number;
  serialNumber: string;
  issuer: string;
  subject: string;
  ca: boolean;

  revoked: boolean;
  revokedAt: Date;
  evokeReason: string;
  constructor() {}
}
