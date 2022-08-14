import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: "eom-slider",
  templateUrl: './slider.component.html',
  styleUrls: ["./slider.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit{
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
  ngOnInit(): void {
    
  }
}
