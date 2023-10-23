import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import { FavoritesPageComponent } from './home/favorites-page/favorites-page.component';
import { IndexPageComponent } from './home/index-page/index-page.component';
import { NotificationsPageComponent } from './home/notifications-page/notifications-page.component';
import { ProfileComponent } from './home/profile/profile.component';
import { PublishProductPageComponent } from './home/publish-product-page/publish-product-page.component';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { ShowProfileComponent } from './home/show-profile/show-profile.component';
import { SingleProductPageComponent } from './home/single-product-page/single-product-page.component';
import { TwinsPageComponent } from './home/twins-page/twins-page.component';
import { PublishOfferComponent } from './home/publish-offer/publish-offer.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: SignUpPageComponent},
  {path: 'publish-product', component: PublishProductPageComponent},
  {path: 'publish-offer', component: PublishOfferComponent},
  {path: 'notifications', component: NotificationsPageComponent},
  {path: 'twins', component: TwinsPageComponent },
  {path: 'product/:uuid', component: SingleProductPageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'favorites', component: FavoritesPageComponent },
  {
    path: 'profile/:id', component: ShowProfileComponent
  },
  {
    path: 'search', component: SearchPageComponent
  },{
    path: 'search/:search', component: SearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
