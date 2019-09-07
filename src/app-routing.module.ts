import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateTreeComponent} from './app/components/certificate-tree/certificate-tree.component';
import {NotFoundPageComponent} from './app/components/not-found-page/not-found-page.component';
import {LoginComponent} from './app/components/login/login.component';
import {CanActivateAuthGuard} from './app/security/can-activate-auth.guard';
import {IamComponent} from './app/components/iam/iam.component';
import {MySettingsComponent} from './app/components/my-settings/my-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full'
  },
  {
    path: 'tree',
    component: CertificateTreeComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'iam',
    component: IamComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'my-settings',
    component: MySettingsComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
