import { Component, OnInit } from '@angular/core';
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
    private searchService: SearchService
  ) { }
  public results;
  public users;
  public products;
  public services;
  public api = environment.apiUrl;
  ngOnInit(): void {
  }
  searchEvent(search:string){
    this.search = search;
    this.searchService.index(this.search).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.results = res.data;
        this.users = res.data.users;
        this.products = res.data.products;
        console.log( this.products. length)
        this.services = res.data.services;
      }
    })
  }
  filterEvent(filter){
    console.log(filter)
  }
}
