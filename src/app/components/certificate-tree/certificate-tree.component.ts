import { Component, OnInit } from '@angular/core';
import {CertRequestImpl} from '../../models/Impl/cert-request-impl';

@Component({
  selector: 'app-certificate-tree',
  templateUrl: './certificate-tree.component.html',
  styleUrls: ['./certificate-tree.component.css']
})
export class CertificateTreeComponent implements OnInit {
  private nodes: any;
  private options: any;

  private data = new CertRequestImpl();
  public showSpinner: boolean;

  /* subject data */
  private countryNameC: string;
  private organizationO: string;
  private organizationalUnitOU: string;
  private commonNameCN: string;

  constructor() {
    this.nodes = null;
  }

  ngOnInit() {
    this.nodes = [];
    this.options = {};
  }

  create() {

  }



}
