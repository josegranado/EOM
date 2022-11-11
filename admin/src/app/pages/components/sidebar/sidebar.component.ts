import { Component, OnInit } from '@angular/core';
import data, { MenuItem }from '../../../constants/menu';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public MenuItems: MenuItem[]= data;
  constructor() { }

  ngOnInit(): void {
    console.log(this.MenuItems)
  }

}
