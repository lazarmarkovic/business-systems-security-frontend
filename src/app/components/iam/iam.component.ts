import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CertificateService} from '../../services/certificate.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user/user';
import {UserImpl} from '../../models/Impl/user-impl';
import {UserRegisterRequestImpl} from '../../models/Impl/user-register-request-impl';
import {UserRegisterRequest} from '../../models/user/user-register-request';
import {UserService} from '../../services/user.service';
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';
import {UserPermissionsUpdateRequestImpl} from '../../models/Impl/user-permissions-update-request-impl';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {

  public showSpinner: boolean;
  private allPermissions = [
    { id: 1, name: 'register_users' },
    { id: 2, name: 'edit_user_permissions' },
    { id: 3, name: 'suspend_user' },
    { id: 4, name: 'issue_root_certificate' },
    { id: 5, name: 'issue_intermediate_certificate' },
    { id: 6, name: 'issue_user_certificate' },
    { id: 7, name: 'revoke_root_certificate' },
    { id: 8, name: 'revoke_intermediate_certificate' },
    { id: 9, name: 'revoke_user_certificate' },
    { id: 10, name: 'distribute_root_certificate' },
    { id: 11, name: 'distribute_intermediate_certificate' },
    { id: 12, name: 'distribute_user_certificate' }
  ];
  private dropdownSettings = {
    singleSelection: false,
    id: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 12,
    allowSearchFilter: true,
  };


  /* For user editing */
  private selectedUser: User;
  private selectedItemsEdit = [];
  private userDataSource = [];
  private displayedColumns: string[] = ['id', 'name', 'email', 'suspended'];
  private userSuspended: boolean;

  /* For user registration */
  private userRegisterRequest: UserRegisterRequest;
  private selectedItemsRegistration = [];


  constructor(private userService: UserService,
              private toastrService: ToastrService) {
  }


  ngOnInit() {
    this.showSpinner = false;
    this.getAllUsers();

    /* For user editing */
    this.selectedUser = new UserImpl();
    this.selectedItemsEdit = [];

    /* For user registration */
    this.selectedItemsRegistration = [];
    this.userRegisterRequest = new UserRegisterRequestImpl();
    this.userRegisterRequest.permissions = [];
  }

  /* For user registration */
  registerNewUser() {
    this.showSpinner = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedItemsRegistration.length; i++) {
      this.userRegisterRequest.permissions.push(this.selectedItemsRegistration[i].id);
    }

    this.userService
      .register(this.userRegisterRequest)
      .subscribe(
        () => {
          this.toastrService.success('New user is created.');
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }


  /* For user editing */
  getAllUsers() {
    this.showSpinner = true;
    this.userService
      .getAll()
      .subscribe(
        (users: User[]) => {
          this.userDataSource = users;
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }

  selectRow(row: User) {
    this.selectedUser = row;

    this.selectedItemsEdit = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedUser.userPermissions.length; i++) {
      this.selectedItemsEdit.push(this.allPermissions[this.selectedUser.userPermissions[i].id - 1]);
    }

    this.userSuspended = this.selectedUser.suspended;
  }

  editUser() {
    const userPermissionsUpdateRequest = new UserPermissionsUpdateRequestImpl();
    userPermissionsUpdateRequest.permissions = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedItemsEdit.length; i++) {
      userPermissionsUpdateRequest.permissions.push(this.selectedItemsEdit[i].id);
    }
    userPermissionsUpdateRequest.suspended = this.userSuspended;

    this.userService
      .updatePermissions(this.selectedUser.id, userPermissionsUpdateRequest)
      .subscribe(
        () => {
          this.toastrService.success('User is updated successfully.');
          this.showSpinner = false;
        },
        (err) => {
          this.toastrService.error(err.error.apierror.message);
          this.showSpinner = false;
        }
      );
  }
}

