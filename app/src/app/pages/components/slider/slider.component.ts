import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import { ProductService } from "src/app/services/product.service";
import { environment } from "src/environments/environment";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'eom-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  constructor( private productService: ProductService) { }
  public products = [];
  public API_ENDPOINT = environment.apiUrl;
  ngOnInit(): void {
    this.productService.index().subscribe( res => {
      console.log( res )
      if (res.status == 201){
        this.products = res.data;
      } 
    }
    )
  }

}
