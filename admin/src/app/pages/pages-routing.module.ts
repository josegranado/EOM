import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../interfaces/auth.guard';
import { LoginGuard } from '../interfaces/login.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AsignationsListPageComponent } from './dashboard/asignations-list-page/asignations-list-page.component';
import { BoughtsListPageComponent } from './dashboard/boughts-list-page/boughts-list-page.component';
import { BrokerListPageComponent } from './dashboard/broker-list-page/broker-list-page.component';
import { CreditIndexPageComponent } from './dashboard/credit-index-page/credit-index-page.component';
import { CreditsEomListPageComponent } from './dashboard/credits-eom-list-page/credits-eom-list-page.component';
import { CreditsMembersListPageComponent } from './dashboard/credits-members-list-page/credits-members-list-page.component';
import { IndexPageComponent } from './dashboard/index-page/index-page.component';
import { MemberListPageComponent } from './dashboard/member-list-page/member-list-page.component';
import { MembersIndexPageComponent } from './dashboard/members-index-page/members-index-page.component';
import { PostsListPageComponent } from './dashboard/posts-list-page/posts-list-page.component';
import { PreRegistersListPageComponent } from './dashboard/pre-registers-list-page/pre-registers-list-page.component';
import { RecordsListPageComponent } from './dashboard/records-list-page/records-list-page.component';
import { RegistersIndexPageComponent } from './dashboard/registers-index-page/registers-index-page.component';
import { ReportsIndexPageComponent } from './dashboard/reports-index-page/reports-index-page.component';
import { ReportsListPageComponent } from './dashboard/reports-list-page/reports-list-page.component';
import { SalesListPageComponent } from './dashboard/sales-list-page/sales-list-page.component';
import { TransactionsIndexPageComponent } from './dashboard/transactions-index-page/transactions-index-page.component';
import { UsersPageComponent } from './dashboard/users-page/users-page.component';


const routes: Routes = [
  {
    path: '', component: LoginPageComponent,
    canActivate: [ LoginGuard ]
  },
  {
    path: 'dashboard', component: IndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/users', component: UsersPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/members', component: MembersIndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  
  {
    path: 'dashboard/records', component: RegistersIndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/records/list', component: PreRegistersListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/reports', component: ReportsIndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/transactions', component: TransactionsIndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/credits', component: CreditIndexPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/credits/asignations', component: AsignationsListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/credits/eom', component: CreditsEomListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/credits/members', component: CreditsMembersListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/members/list', component: MemberListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/transactions/posts', component: PostsListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/records/list', component: RecordsListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/reports/list', component: ReportsListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/transactions/sales', component: SalesListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/transactions/boughts', component: BoughtsListPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/members/brokers', component: BrokerListPageComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
