import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'eom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public identity;
  public menu = false;
  public account;
  constructor(private accountService: AccountService ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') as string);
  }
  ngOnInit(): void {
    this.accountService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.account = res.data;
      }
    })
  }
  showMenu(){
    this.menu = !this.menu;
  }
  onSignOut(){
    localStorage.clear();
    location.reload();
  }
}
