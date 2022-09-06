import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
 
  public identity = {};
  public products = []; 
  constructor(private productService: ProductService) { 
    this.identity =  JSON.parse(localStorage.getItem('identity') as string);
  }
  
  ngOnInit(): void {
    this.productService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.products = res.data;
      }
    })
  }

}
