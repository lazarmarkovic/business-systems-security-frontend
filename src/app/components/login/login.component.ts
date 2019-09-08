import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import { AuthenticationService } from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginCredentials = {
    email: '',
    password: '',
  };
  public wrongUsernameOrPass: boolean;
  public showSpinner: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.wrongUsernameOrPass = false;
  }

  ngOnInit() {}

  login(): void {
    this.showSpinner = true;
    this.authenticationService
      .login(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        (userResponse: User) => {
          this.showSpinner = false;
          if (userResponse) {
            if (this.userService.hasAnyPermissions(
              userResponse,
              [
                this.userService.ISSUE_ROOT_CERTIFICATE,
                this.userService.ISSUE_INTERMEDIATE_CERTIFICATE,
                this.userService.ISSUE_USER_CERTIFICATE,
                this.userService.REVOKE_ROOT_CERTIFICATE,
                this.userService.REVOKE_INTERMEDIATE_CERTIFICATE,
                this.userService.REVOKE_USER_CERTIFICATE,
                this.userService.DISTRIBUTE_ROOT_CERTIFICATE,
                this.userService.DISTRIBUTE_INTERMEDIATE_CERTIFICATE,
                this.userService.DISTRIBUTE_USER_CERTIFICATE
              ])) {
              this.router.navigate(['/tree']);
            } else if (this.userService.hasAnyPermissions(
              userResponse,
              [
                this.userService.EDIT_USER_PERMISSIONS,
                this.userService.REGISTER_USERS,
              ])) {
              this.router.navigate(['/iam']);
            } else {
              this.router.navigate(['/my-settings']);
            }

          }
        },
        err => {
          this.showSpinner = false;
          this.toastrService.error(err.error.apierror.message);
          console.log(err);
          this.wrongUsernameOrPass = true;
        }
      );
  }
}
