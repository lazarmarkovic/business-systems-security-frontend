import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certificate} from '../models/certificate/certificate';
import {CertRequest} from '../models/certificate/cert-request';
import {TreeItem} from '../models/treeItem';
import {RevokeRequest} from '../models/certificate/revoke-request';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private readonly path = environment.baseUrl + '/api/certificates';

  constructor(private http: HttpClient) {
  }

  get(id: any): Observable<Certificate> {
    return this.http.get<Certificate>(this.path + `/${id}`);
  }

  getForest(): Observable<TreeItem[]> {
    return this.http.get<TreeItem[]>(this.path + '/forest');
  }

  downloadZip(serialNumber: any): any {
    return this.http.get(this.path + `/${serialNumber}/zip`, {responseType: 'blob'}).toPromise();
  }

  create(certificateCreateRequest: CertRequest): Observable<Certificate> {
    return this.http.post<Certificate>(this.path, certificateCreateRequest);
  }

  revoke(certificateRevokeRequest: RevokeRequest): Observable<Certificate> {
    return this.http.post<Certificate>(this.path + '/revoke', certificateRevokeRequest);
  }

  unrevoke(serialNumber: any): Observable<Certificate> {
    return this.http.get<Certificate>(this.path +  `/${serialNumber}/unrevoke`);
  }
}
