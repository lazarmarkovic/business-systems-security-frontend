import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserPasswordResetRequestImpl} from '../../models/Impl/user-password-reset-request-impl';
import {UserPasswordResetRequest} from '../../models/user/user-password-reset-request';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user/user';
import {ToastrService} from 'ngx-toastr';
import {UserUpdateRequest} from '../../models/user/user-update-request';
import {UserUpdateRequestImpl} from '../../models/Impl/user-update-request-impl';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.css']
})
export class MySettingsComponent implements OnInit {

  public showSpinner = false;
  public user = this.authService.getCurrentUser().user;
  public userPassData: UserPasswordResetRequest;

  public firstName: string;
  public lastName: string;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.userPassData = new UserPasswordResetRequestImpl();
    this.userPassData.newPassword = '';
    this.userPassData.oldPassword = '';

    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
  }

  changePassword() {
    this.userService
      .changePassword(this.user.id, this.userPassData)
      .subscribe(
        () => {
          this.showSpinner = false;
          this.toastrService.success('User password is updated successfully.');
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

  updateInfo() {
    const userInfoData = new UserUpdateRequestImpl();
    userInfoData.firstName = this.firstName;
    userInfoData.lastName = this.lastName;

    this.userService
      .updateInfo(this.user.id, userInfoData)
      .subscribe(
        () => {
          this.showSpinner = false;
          this.toastrService.success('User personal information is updated successfully.');
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

}
