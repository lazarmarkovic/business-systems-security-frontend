import { Component, OnInit } from '@angular/core';
import {CertificateService} from '../../services/certificate.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user/user';
import {UserImpl} from '../../models/Impl/user-impl';
import {UserRegisterRequestImpl} from '../../models/Impl/user-register-request-impl';
import {UserRegisterRequest} from '../../models/user/user-register-request';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {

  private selectedUser: User;
  private userRegisterRequest: UserRegisterRequest;

  public showSpinner: boolean;

  constructor(private certService: CertificateService,
              private toastrService: ToastrService) {
  }


  ngOnInit() {
    this.selectedUser = new UserImpl();
    this.userRegisterRequest = new UserRegisterRequestImpl();

    this.showSpinner = false;
  }

  registerNewUser() {}

}
