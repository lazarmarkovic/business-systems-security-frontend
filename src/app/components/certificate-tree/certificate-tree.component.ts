import { Component, OnInit } from '@angular/core';
import {CertRequestImpl} from '../../models/Impl/cert-request-impl';
import {CertificateService} from '../../services/certificate.service';
import {TreeItem} from '../../models/treeItem';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';
import {Certificate} from '../../models/certificate/certificate';
import {RevokeRequestImpl} from '../../models/Impl/revoke-request-impl';
import {CertificateImpl} from '../../models/Impl/certificate-impl';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-certificate-tree',
  templateUrl: './certificate-tree.component.html',
  styleUrls: ['./certificate-tree.component.css']
})
export class CertificateTreeComponent implements OnInit {
  public user = this.authService.getCurrentUser();


  private nodes: any;
  private options: any;

  private certGenerateData = new CertRequestImpl();
  private certRevokeData = new RevokeRequestImpl();

  public showSpinner: boolean;

  private selectedNodeId: number;
  private selectedNodeName: string;
  private selectedNodeCertificate: Certificate;

  private country: string;
  private organization: string;
  private organizationalUnit: string;
  private commonName: string;

  constructor(private certService: CertificateService,
              private toastrService: ToastrService,
              private authService: AuthenticationService,
              private userService: UserService) {
    this.nodes = null;
  }

  ngOnInit() {
    this.nodes = [];
    this.options = {};
    this.selectedNodeCertificate = new CertificateImpl();

    this.fetchForest();
  }

  onTreeNodeSelect(event: any) {

    // Collect all of certificate data from selected node
    this.selectedNodeCertificate             = event.node.data.certificate;

    // Collect data for certificate generation
    this.selectedNodeId                      = event.node.data.id;
    this.selectedNodeName                    = event.node.data.name;
    this.certGenerateData.issuerSerialNumber = event.node.data.certificate.serialNumber;

    // Collect data for certificate revocation
    this.certRevokeData.serialNumber         = event.node.data.certificate.serialNumber;
    this.certRevokeData.reason               = event.node.data.certificate.revokeReason;
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
    if (this.certGenerateData.issuerSerialNumber === undefined && this.certGenerateData.certificateType !== 'ROOT') {
      this.toastrService.error('Only ROOT cert can be created with no issuer data.');
      return;
    }

    if (this.selectedNodeCertificate.type === 'ROOT' && this.certGenerateData.certificateType === 'USER') {
      this.toastrService.error('There must be intermediate certificate between root and user certificate.');
      return;
    }

    this.showSpinner = true;

    this.certGenerateData.country = this.country;
    this.certGenerateData.organization = this.organization;
    this.certGenerateData.organizationUnit = this.organizationalUnit;
    this.certGenerateData.commonName = this.commonName;

    this.certService
      .create(this.certGenerateData)
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


  revoke() {
    this.showSpinner = true;

    this.certService
      .revoke(this.certRevokeData)
      .subscribe(
        () => {
          this.fetchForest();
          this.toastrService.success('Selected certificate has been revoked.');
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

  unrevoke() {
    this.showSpinner = true;

    this.certService
      .unrevoke(this.certRevokeData.serialNumber)
      .subscribe(
        () => {
          this.fetchForest();
          this.toastrService.success('Selected certificate has been un-revoked.');
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

}
