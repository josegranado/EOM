import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss']
})
export class PostsListPageComponent implements OnInit {
  products: any;
  page:number = 1;
  api:string = environment.apiUrl;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.index(this.page).subscribe( res => {
      console.log(res)
      if ( res.status == 201){
        this.products = res.data.data;
      }
    })
  }

}
