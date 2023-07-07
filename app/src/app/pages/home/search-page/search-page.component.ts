import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public search:string;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private _activated: ActivatedRoute
  ) { }
  public results;
  public users;
  public products;
  public services;
  public api = environment.apiUrl;
  public
  ngOnInit(): void {
    this.search = this._activated.snapshot.paramMap.get('search');
    console.log(this.search)
    this.searchService.index(this.search).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.results = res.data;
        this.users = res.data.users;
        this.products = res.data.products;
        this.services = res.data.services;
        console.log(this.products)
        console.log(this.services )
      }
    })
  }
  searchEvent(search:string){
    this.search = search;
    this.searchService.index(this.search).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.results = res.data;
        this.users = res.data.users;
        this.products = res.data.products;
        this.services = res.data.services;
        console.log(this.products)
        console.log(this.services )
      }
    })
  }
  
}
