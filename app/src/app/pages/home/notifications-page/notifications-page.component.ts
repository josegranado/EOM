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
  public notifications = true;
  public twins = false;
  public identity;
  public content;
  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private twinService: TwinService,
    private messageService: MessageService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity'))
  }
  public twinsData;
  public notificationsData;
  public apiUrl = environment.apiUrl;
  ngOnInit(): void {
    this.notificationService.index().subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        this.notificationsData = res.data;
        this.twinService.index().subscribe( res =>{
          console.log( res )
          if ( res.status == 201){
            this.twinsData = res.data;
          }
        })
      }
    })
  }
  public twin = null;
  public messages;
  openTwin(id){
    this.twinService.show(id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.twin = res.data;
        this.messages = res.data.messages;
        this.messageService.listen('message-event').subscribe( data => { 
          this.twinService.show(id).subscribe( res => {
            console.log( res )
            if ( res.status == 201 ){
              this.twin = res.data;
              this.messages = res.data.messages;
            }
        })
      })
    }
  })
  }
  message(value){
    let message = {
      content: value.content,
      from: this.identity.id,
      twin_id: this.twin.id,
      deleted: 0
    }
    this.messageService.emit('send-message', message );
    this.openTwin(this.twin.id )
  }
}
