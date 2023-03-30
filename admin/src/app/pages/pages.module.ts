import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
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
import { MembersIndexPageComponent } from './dashboard/members-index-page/members-index-page.component';
import { RegistersIndexPageComponent } from './dashboard/registers-index-page/registers-index-page.component';
import { TransactionsIndexPageComponent } from './dashboard/transactions-index-page/transactions-index-page.component';
import { CreditIndexPageComponent } from './dashboard/credit-index-page/credit-index-page.component';
import { ReportsIndexPageComponent } from './dashboard/reports-index-page/reports-index-page.component';
import { PreRegistersListPageComponent } from './dashboard/pre-registers-list-page/pre-registers-list-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { MemberListPageComponent } from './dashboard/member-list-page/member-list-page.component';
import { BrokerListPageComponent } from './dashboard/broker-list-page/broker-list-page.component';
import { RecordsListPageComponent } from './dashboard/records-list-page/records-list-page.component';
import { PostsListPageComponent } from './dashboard/posts-list-page/posts-list-page.component';
import { BoughtsListPageComponent } from './dashboard/boughts-list-page/boughts-list-page.component';
import { SalesListPageComponent } from './dashboard/sales-list-page/sales-list-page.component';
import { CreditsEomListPageComponent } from './dashboard/credits-eom-list-page/credits-eom-list-page.component';
import { CreditsMembersListPageComponent } from './dashboard/credits-members-list-page/credits-members-list-page.component';
import { AsignationsListPageComponent } from './dashboard/asignations-list-page/asignations-list-page.component';
import { ReportsListPageComponent } from './dashboard/reports-list-page/reports-list-page.component';
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
    ReportsIndexPageComponent,
    PreRegistersListPageComponent,
    MemberListPageComponent,
    BrokerListPageComponent,
    RecordsListPageComponent,
    PostsListPageComponent,
    BoughtsListPageComponent,
    SalesListPageComponent,
    CreditsEomListPageComponent,
    CreditsMembersListPageComponent,
    AsignationsListPageComponent,
    ReportsListPageComponent
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
