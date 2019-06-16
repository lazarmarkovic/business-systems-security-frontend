import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { CertificateTreeComponent } from './app/components/certificate-tree/certificate-tree.component';
import { NotFoundPageComponent } from './app/components/not-found-page/not-found-page.component';
import { LoginComponent } from './app/components/login/login.component';


import { CertificateService } from './app/services/certificate.service';


import { MaterialModule } from './app/MaterialModule';
import { TreeModule } from 'angular-tree-component';
import { ToastrModule } from 'ngx-toastr';
import {CanActivateAdminServiceGuard} from './app/security/can-activate-admin.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './app/security/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CertificateTreeComponent,
    NotFoundPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule.forRoot(),
    ToastrModule.forRoot(),
    MaterialModule,

  ],
  providers: [
    CertificateService,


    // JWT things
    CanActivateAdminServiceGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
