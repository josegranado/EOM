import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import { IndexPageComponent } from './home/index-page/index-page.component';
import { PublishProductPageComponent } from './home/publish-product-page/publish-product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular'
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './home/profile/profile.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SidebarUniverseComponent } from './components/sidebar-universe/sidebar-universe.component';
@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    LoginPageComponent,
    SignUpPageComponent,
    IndexPageComponent,
    PublishProductPageComponent,
    ProfileComponent,
    SidebarUniverseComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SwiperModule,
    HttpClientModule,
    NgSelectModule,
    RatingModule.forRoot(),
    ReactiveFormsModule 
  ]
})
export class PagesModule { }
