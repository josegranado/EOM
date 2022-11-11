import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public identity;
  public menu = false;
  constructor() { 
    this.identity = JSON.parse(localStorage.getItem('identity') as string);
  }
  ngOnInit(): void {
  }
  showMenu(){
    this.menu = !this.menu;
  }
  onSignOut(){
    localStorage.clear();
    location.reload();
  }
}
