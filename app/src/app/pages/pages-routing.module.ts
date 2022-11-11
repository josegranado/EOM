import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import { IndexPageComponent } from './home/index-page/index-page.component';
import { ProfileComponent } from './home/profile/profile.component';
import { PublishProductPageComponent } from './home/publish-product-page/publish-product-page.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: SignUpPageComponent},
  {path: 'publish-product', component: PublishProductPageComponent},
  {path: ':username', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
