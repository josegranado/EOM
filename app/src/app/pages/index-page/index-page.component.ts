import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";

import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Pagination, Navigation } from "swiper";
SwiperCore.use([Pagination, Navigation]);
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public products = [
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    },
    { 
      imgUrl: 'assets/images/product.png',
      title: 'Título hasta 2 líneas o 90 carácteres',
      price: 1550
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
