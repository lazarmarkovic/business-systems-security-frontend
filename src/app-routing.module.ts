import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateTreeComponent} from './app/components/certificate-tree/certificate-tree.component';
import {NotFoundPageComponent} from './app/components/not-found-page/not-found-page.component';
import {CanActivateAdminServiceGuard} from './app/security/can-activate-admin.guard';
import {LoginComponent} from './app/components/login/login.component';
import {CanActivateAuthGuard} from './app/security/can-activate-auth.guard';

const routes: Routes = [
  { path: '',
    redirectTo: 'tree',
    pathMatch: 'full'
  },
  { path: 'tree',
    component: CertificateTreeComponent,
    canActivate: [CanActivateAuthGuard, CanActivateAdminServiceGuard]
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
