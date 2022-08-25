import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SwiperModule } from 'swiper/angular'
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PagesComponent,
    IndexPageComponent,
    LoginPageComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SwiperModule,
    HttpClientModule
  ]
})
export class PagesModule { }
