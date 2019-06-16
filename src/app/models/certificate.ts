export interface Certificate {
  id: number;
  serialNumber: string;
  issuer: string;
  subject: string;
  active: boolean;
  ca: boolean;
}
