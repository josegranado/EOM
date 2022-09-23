import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public menu = false;
  constructor() { }

  ngOnInit(): void {
  }
  activeMenu(){
    if ( this.menu == false ){
      this.menu = true;
    }else{
      this.menu = false;
    }
  }
  onSignOut(){
    localStorage.clear();
  }
}
