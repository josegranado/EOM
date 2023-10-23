import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-list-page',
  templateUrl: './member-list-page.component.html',
  styleUrls: ['./member-list-page.component.scss']
})
export class MemberListPageComponent implements OnInit {
  users: any;
  user: any;
  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.userService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.users = res.data;
      }
    })
  }
  openModal(modal: TemplateRef<any>, user: any ): void {
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
