import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-broker-list-page',
  templateUrl: './broker-list-page.component.html',
  styleUrls: ['./broker-list-page.component.scss']
})
export class BrokerListPageComponent implements OnInit {
  brokers: any;
  modalRef: BsModalRef;
  user: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
     this.userService.brokers().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.brokers = res.data;
      }
     })
  }
  open(modal, user){
    if ( user ){
      this.userService.show(user.id).subscribe( res =>{
        console.log( res )
        if ( res.status == 201){
          this.user = res.data;
          this.user.password = '';
        }
      })
    }
    this.modalRef = this.modalService.show(modal);
  }
  update(user){
    this.userService.update(user.id, user).subscribe( res => {
      console.log( res )
      if( res.status == 201){
        location.reload();
      }
    })
  }
  delete( user ){
    this.userService.delete(user.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  onSubmit(user){
    user.role = 2;
    this.userService.store(user).subscribe( res =>{
      console.log( res)
      if ( res.status == 201){
        location.reload();
      }
    })
  }
}
