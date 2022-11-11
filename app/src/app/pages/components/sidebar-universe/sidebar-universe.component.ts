import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-universe',
  templateUrl: './sidebar-universe.component.html',
  styleUrls: ['./sidebar-universe.component.scss']
})
export class SidebarUniverseComponent implements OnInit {
  public API_ENDPOINT = environment.apiUrl;
  public identity = {};
  public products = []; 
  public categories: boolean = false;
  public listCategories = false;
  public ubication = false;
  public price = false;
  public type = false;
  public use = false;
  public list = false;
  public grid = true;
  public items = [
  ]
  constructor() { 
    this.identity = JSON.parse(localStorage.getItem('identity'))
  }

  ngOnInit(): void {
  }
  selectCategory(category: any ){
    if ( !this.categories ){
      this.categories = true;
      this.items.push(category);
    }
    
}
public services = false;
public types = false;
selectType( type: any){
  if ( !this.types){
    this.types = true;
    this.items.push(type)
  }
}
public uses = false;
selectUse(use:any){
  if ( !this.uses){
    this.uses = true;
    this.items.push(use)
  }

}
public from: number;
public until: number ;
public ubicationInput: string = ''
priceChange(){}
clear(){
  this.items = [];
  this.categories = false;
  this.types =  false;
  this.uses = false;
  this.from = null,
  this.until = null;
  this.ubicationInput = '';
}
}
