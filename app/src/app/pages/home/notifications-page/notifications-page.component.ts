import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TwinService } from 'src/app/services/twin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {
  public identity;
  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity'))
  }
  public twinsData;
  public notificationsData;
  public apiUrl = environment.apiUrl;
  public notifications;
  ngOnInit(): void {
    this.notificationService.index().subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        this.notifications = res.data;
        this.notificationService.emit('view-notification', this.identity)
      }
    })
  }
}
