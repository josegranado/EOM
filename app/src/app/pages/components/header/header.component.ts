import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public identity;
  constructor() { 
    this.identity = JSON.parse(localStorage.getItem('identity'))
  }

  ngOnInit(): void {
  }

}
