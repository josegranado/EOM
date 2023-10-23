import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TwinService } from 'src/app/services/twin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-twins-page',
  templateUrl: './twins-page.component.html',
  styleUrls: ['./twins-page.component.scss']
})
export class TwinsPageComponent implements OnInit {
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
    this.twinService.index().subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        this.twinsData = res.data;
      }
    })
  }
  public twin = null;
  public messages;
  openTwin(id):void{
    
      this.twinService.show(id).subscribe( res => {
        console.log( res )
        if ( res.status == 201 ){
          this.twin = res.data;
          this.messages = res.data.messages;
          this.messageService.listen('message').subscribe( res =>{ 
            this.twinService.show(id).subscribe( res => {
              console.log( res )
              if ( res.status == 201 ){
                this.twin = res.data;
                this.messages = res.data.messages;
              }
            }) 
          });   
        }
      });
      
  }
  public message_content = '';
  message( value ):void{
    console.log( value )
    
    let message;
    if ( this.identity.id === this.twin.from.id){
       message = {
        content: this.message_content,
        from: this.twin.from.id,
        twin_id: this.twin.id,
        to: this.twin.to.id,
        deleted: 0
      }
      this.message_content = '';
    }else{
      message = {
        content: value.content,
        from: this.twin.to.id,
        twin_id: this.twin.id,
        to: this.twin.from.id,
        deleted: 0
      }
      this.message_content = '';
    }
    this.messageService.emit('message', message );
    this.openTwin(this.twin.id);
  }
}
