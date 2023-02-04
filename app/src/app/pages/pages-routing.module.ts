import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import { IndexPageComponent } from './home/index-page/index-page.component';
import { NotificationsPageComponent } from './home/notifications-page/notifications-page.component';
import { ProfileComponent } from './home/profile/profile.component';
import { PublishProductPageComponent } from './home/publish-product-page/publish-product-page.component';
import { ShowProfileComponent } from './home/show-profile/show-profile.component';
import { SingleProductPageComponent } from './home/single-product-page/single-product-page.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: SignUpPageComponent},
  {path: 'publish-product', component: PublishProductPageComponent},
  {path: 'notifications', component: NotificationsPageComponent},
  {path: 'product/:uuid', component: SingleProductPageComponent},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'profile/:id', component: ShowProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
