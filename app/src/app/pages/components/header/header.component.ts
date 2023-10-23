import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'eom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public identity;
  public menu = false;
  public account;
  public notifications;
  @Output() searchEvent = new EventEmitter<string>();
  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') as string);
  }
  public search = false;
  ngOnInit(): void {
    this.accountService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.account = res.data;
        this.notificationService.index().subscribe( res => {
          console.log(( res ))
          if ( res.status == 201){
            this.notifications = res.count;
            this.notificationService.listen('notification').subscribe( data => {
              this.notificationService.index().subscribe( res => {
                console.log(( res ))
                if ( res.status == 201){
                  this.notifications = res.count;
                }
              })
            })
          }
        })
        
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
  searching(values){
    this.searchEvent.emit(values.search);
    this.router.navigate(['/search/'+values.search ]);
  }
  public secondary = true;
}
