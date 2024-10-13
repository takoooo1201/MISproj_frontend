import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotDevelopedComponent } from './not-developed/not-developed.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { EinvoiceDetailComponent } from './einvoice-detail/einvoice-detail.component';
import { EinvoiceComponent } from './einvoice/einvoice.component';
import { EinvoiceLoginComponent } from './einvoice-login/einvoice-login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'einvoiceLogin', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'not-developed', component: NotDevelopedComponent },
  { path: 'invoiceDetail', component: InvoiceDetailComponent },
  { path: 'einvoiceDetail', component: EinvoiceDetailComponent },
  { path: 'einvoice', component: EinvoiceComponent },
  { path: 'einvoiceLogin', component: EinvoiceLoginComponent }
];