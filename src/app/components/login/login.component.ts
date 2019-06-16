import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import { AuthenticationService } from '../../services/authentication.service';

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
    private toastrService: ToastrService
  ) {
    this.wrongUsernameOrPass = false;
  }

  ngOnInit() {}

  login(): void {
    this.showSpinner = true;
    this.authenticationService
      .login(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        (loggedIn: boolean) => {
          this.showSpinner = false;
          if (loggedIn) {
            this.router.navigate(['/']);
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
