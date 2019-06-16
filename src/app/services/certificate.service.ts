import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certificate} from '../models/certificate';
import {CertRequest} from '../models/cert-request';
import {TreeItem} from '../models/treeItem';

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

  create(certificateCreateRequest: CertRequest): Observable<Certificate> {
    return this.http.post<Certificate>(this.path, certificateCreateRequest);
  }
}
