import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import { ProductService } from "src/app/services/product.service";
import { environment } from "src/environments/environment";
import { TwinService } from "src/app/services/twin.service";
import { Router } from "@angular/router";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'eom-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  public identity;
  constructor( 
    private productService: ProductService,
    private twinService: TwinService,
    private router: Router  
  ) { }
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
  favorite(product ){
    let notification = {
      identity: this.identity,
      to: product.user_id,
      type: 4
    }
    this.productService.favorite(product.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        location.reload();
      }
    })
  }
  openTwin(id){
    let twin = {
      to: id,
    }
    this.twinService.store(twin).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.router.navigate(['/twins']);
      }
    })
  }
}
