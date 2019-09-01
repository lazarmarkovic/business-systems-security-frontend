import { Component, OnInit } from '@angular/core';
import {CertRequestImpl} from '../../models/Impl/cert-request-impl';
import {CertificateService} from '../../services/certificate.service';
import {TreeItem} from '../../models/treeItem';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';
import {Certificate} from '../../models/certificate';


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

  private selectedNodeId: number;
  private selectedNodeName: string;
  private selectedNodeCertificate: Certificate;

  private country: string;
  private organization: string;
  private organizationalUnit: string;
  private commonName: string;

  constructor(private certService: CertificateService,
              private toastrService: ToastrService) {
    this.nodes = null;
  }

  ngOnInit() {
    this.nodes = [];
    this.options = {};

    this.fetchForest();
  }

  onTreeNodeSelect(event: any) {
    this.selectedNodeId           = event.node.data.id;
    this.selectedNodeName         = event.node.data.name;
    this.selectedNodeCertificate  = event.node.data.certificate;

    this.data.issuerName          = event.node.data.certificate.subject;
  }

  fetchForest() {
    this.certService
      .getForest()
      .subscribe(
        (forest: TreeItem[]) => {
          this.nodes = forest;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
        }
      );
  }

  create() {
    if (this.data.issuerName === undefined && this.data.certificateType !== 'ROOT') {
      this.toastrService.error('Only ROOT cert can be created with no issuer data.');
      return;
    }

    this.showSpinner = true;

    this.data.country = this.country;
    this.data.organization = this.organization;
    this.data.organizationUnit = this.organizationalUnit;
    this.data.commonName = this.commonName;

    this.certService
      .create(this.data)
      .subscribe(
        () => {
          this.fetchForest();
          this.toastrService.success('New certificate is created.');
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

  startDownload() {
    if (this.selectedNodeId === undefined) {
      this.toastrService.error('Please select cert to download.');
      return;
    }

    this.certService
      .downloadZip(this.selectedNodeCertificate.serialNumber)
      .then(
        blob => { saveAs(blob, 'data.zip' );
    });
  }

}
