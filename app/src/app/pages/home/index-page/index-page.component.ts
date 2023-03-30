import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public products;
  public identity;
  public list = false;
  public grid = true;
  public API_ENDPOINT = environment.apiUrl;
  constructor(
    private productService: ProductService,
    private accountService: AccountService
    ) { 
    this.identity =  JSON.parse(localStorage.getItem('identity') as string);
  }
  public account;
  public apiUrl = environment.apiUrl;
  public allProducts;
  ngOnInit(): void {
    this.productService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.products = res.data;
        this.allProducts = res.data;
      }
    })
  }
  favorite(id){
    this.productService.favorite(id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        location.reload();
      }
    })
  }
  filterEvent(filter){
    console.log(filter)
    this.products = this.allProducts;
    if (filter.category ){
      this.products = this.products.filter( product => product.category_id == filter.category.value )
    }
  
    if ( filter.from_price ){
      this.products = this.products.filter( product => product.price > filter.from_price )
    }
    if ( filter.to_price ){
      this.products = this.products.filter( product => product.price < filter.to_price )
    }
    if ( filter.ubication ){
      this.products = this.products.filter(product => product.ubication == filter.ubication )
    }
    if ( filter.use ){
      this.products = this.products.filter( product => product.is_used == filter.use )
    }
  }
}
