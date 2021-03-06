import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user = this.authService.getCurrentUser();

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  title = 'business-systems-security-frontend';

  loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.authService.localUser = null;
  }
}
