import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../interfaces/auth.guard';
import { LoginGuard } from '../interfaces/login.guard';
import { IndexPageComponent } from './dashboard/index-page/index-page.component';
import { UsersPageComponent } from './dashboard/users-page/users-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
