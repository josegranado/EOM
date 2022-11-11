import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexPageComponent } from './dashboard/index-page/index-page.component';
import { UsersPageComponent } from './dashboard/users-page/users-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { MembersIndexPageComponent } from './members-index-page/members-index-page.component';
import { RegistersIndexPageComponent } from './registers-index-page/registers-index-page.component';
import { TransactionsIndexPageComponent } from './transactions-index-page/transactions-index-page.component';
import { CreditIndexPageComponent } from './credit-index-page/credit-index-page.component';
import { ReportsIndexPageComponent } from './reports-index-page/reports-index-page.component';

@NgModule({
  declarations: [
    PagesComponent,
    LoginPageComponent,
    IndexPageComponent,
    UsersPageComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MembersIndexPageComponent,
    RegistersIndexPageComponent,
    TransactionsIndexPageComponent,
    CreditIndexPageComponent,
    ReportsIndexPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    BsDropdownModule,
    ModalModule.forRoot(),
  ]
})
export class PagesModule { }
