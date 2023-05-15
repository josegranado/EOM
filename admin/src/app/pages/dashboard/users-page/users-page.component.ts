import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  public users: any;
  public modalRef: BsModalRef;
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
    }, error => {

    })
  }
  public user: any;
  openModal(modal: TemplateRef<any>, user: any ): void {
    this.user = user;
    this.modalRef = this.modalService.show(modal);
  }
}
