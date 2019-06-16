import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateTreeComponent} from './app/components/certificate-tree/certificate-tree.component';
import {NotFoundPageComponent} from './app/components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: CertificateTreeComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
