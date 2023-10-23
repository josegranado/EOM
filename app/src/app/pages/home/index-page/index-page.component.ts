import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { TwinService } from 'src/app/services/twin.service';
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
    private accountService: AccountService,
    private router: Router,
    private twinService: TwinService
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
  favorite(product ){
    let notification = {
      identity: this.identity,
      to: product.user_id,
      type: 4
    }
    this.productService.favorite(product.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.router.navigate(['/favorites'])
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
    if ( filter.type ){
      this.products = this.products.filter( product => product.type == filter.type )
    }
  }
  like(id){
    this.productService.like(id).subscribe( res => {
      console.log(res)
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  dislike(id){
    this.productService.dislike(id).subscribe( res => {
      console.log(res)
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  share(id){}
  twin(id){
    let twin = {
      from: this.identity.id,
      to: id
    }
    this.twinService.store(twin).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.router.navigate(['/twins']);
      }
    })
  }
  
}
