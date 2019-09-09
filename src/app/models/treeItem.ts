import {Certificate} from './certificate/certificate';

export interface TreeItem {
  id: number;
  name: string;
  certificate: Certificate;
  children: TreeItem[];
}
