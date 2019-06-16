import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { CertificateTreeComponent } from './app/components/certificate-tree/certificate-tree.component';

import { CertificateService } from './app/services/certificate.service';
import { TreeModule } from 'angular-tree-component';
import { NotFoundPageComponent } from './app/components/not-found-page/not-found-page.component';
import {MaterialModule} from './app/MaterialModule';
import { LoginComponent } from './app/components/login/login.component';

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
    MaterialModule,

  ],
  providers: [
    CertificateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
