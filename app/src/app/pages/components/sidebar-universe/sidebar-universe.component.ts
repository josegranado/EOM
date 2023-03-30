import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() filterEvent = new EventEmitter<any>();
  public items: any = {
    category: null,
    ubication: null,
    to_price: null,
    from_price: null,
    type: null,
    use: null
  };
  public states: any = [
    {value: 1, name:'Aguascalientes'},
    {value: 2, name:'Baja California'},
    {value: 3, name:'Baja California Sur'},
    {value: 4, name:'Campeche'},
    {value: 5, name:'Coahuila'},
    {value: 6, name:'Colima'},
    {value: 7, name:'Chiapas'},
    {value: 8, name:'Chihuahua'},
    {value: 9, name:'Durango'},
    {value: 10, name:'Distrito Federal'},
    {value: 11, name:'Guanajuato'},
    {value: 12, name:'Guerrero'},
    {value: 13, name:'Hidalgo'},
    {value: 14, name:'Jalisco'},
    {value: 15, name:'México'},
    {value: 16, name:'Michoacán'},
    {value: 17, name:'Morelos'},
    {value: 18, name:'Nayarit'},
    {value: 19, name:'Nuevo León'},
    {value: 20, name:'Oaxaca'},
    {value: 21, name:'Puebla'},
    {value: 22, name:'Querétaro'},
    {value: 23, name:'Quintana Roo'},
    {value: 24, name:'San Luis Potosí'},
    {value: 25, name:'Yucatán'},
    {value: 26, name:'Zacatecas'}
  ]
  public selectedItems= [];
  constructor() { 
    this.identity = JSON.parse(localStorage.getItem('identity'))
  }

  ngOnInit(): void {
  }
  selectCategory(category: any ){
    if ( !this.categories ){
      this.categories = true;
      this.items.category = category;
      this.selectedItems.push(category.name)
      this.filterEvent.emit( this.items );
    }
    console.log(category)
    console.log(this.items)    
}
public services = false;
public types = false;
selectType( type: any){
  if ( !this.types){
    this.types = true;
    this.items.type = type;
    this.selectedItems.push(type)
    this.filterEvent.emit( this.items );
  }
  console.log(this.items)
}
setUbication(){

  if ( this.ubicationInput ){
    this.items.ubication = this.ubicationInput.value;
    this.selectedItems.push(this.ubicationInput.name );
    this.filterEvent.emit( this.items );
  }else{
    this.selectedItems = [];
  }
  
}
public uses = false;
selectUse(use:any){
  if ( !this.uses){
    this.uses = true;
    this.items.use = use.value;
    this.selectedItems.push(use.name)
    this.filterEvent.emit( this.items );
  }
  console.log(this.items)
}
public from: number;
public until: number ;
public ubicationInput:any;
priceChange(){
  this.items.from_price = this.from;
  this.items.to_price = this.until;
  this.filterEvent.emit( this.items );
}
clear(){
  this.items = {};
  this.categories = false;
  this.types =  false;
  this.uses = false;
  this.from = null,
  this.until = null;
  this.ubicationInput = '';
  this.selectedItems = [];
  console.log(this.items );
  this.filterEvent.emit( this.items );
}
}
