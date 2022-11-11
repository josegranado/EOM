import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../interfaces/auth.guard';
import { LoginGuard } from '../interfaces/login.guard';
import { CreditIndexPageComponent } from './credit-index-page/credit-index-page.component';
import { IndexPageComponent } from './dashboard/index-page/index-page.component';
import { UsersPageComponent } from './dashboard/users-page/users-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MembersIndexPageComponent } from './members-index-page/members-index-page.component';
import { RegistersIndexPageComponent } from './registers-index-page/registers-index-page.component';
import { ReportsIndexPageComponent } from './reports-index-page/reports-index-page.component';
import { TransactionsIndexPageComponent } from './transactions-index-page/transactions-index-page.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
