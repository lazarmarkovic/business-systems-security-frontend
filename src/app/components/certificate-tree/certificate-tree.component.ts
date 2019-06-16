import { Component, OnInit } from '@angular/core';
import {CertRequestImpl} from '../../models/Impl/cert-request-impl';
import {CertificateService} from '../../services/certificate.service';
import {TreeItem} from '../../models/treeItem';
import {ToastrService} from 'ngx-toastr';

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

  private selectedNodeId: number;
  private selectedNodeName: string;

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
    this.selectedNodeId = event.node.data.id;
    this.selectedNodeName = event.node.data.name;
    this.data.issuer = this.selectedNodeName;
  }

  fetchForest() {
    this.certService
      .getForest()
      .subscribe(
        (forest: TreeItem[]) => {
          this.nodes = forest;
          this.toastrService.success('Forest is loaded.');
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
        }
      );
  }

  create() {
    this.showSpinner = true;
    this.data.subject =
        'C=' + this.countryNameC + ', ' +
        'O=' + this.organizationO + ', ' +
        'OU=' + this.organizationalUnitOU + ', ' +
        'CN=' + this.commonNameCN;

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



}
