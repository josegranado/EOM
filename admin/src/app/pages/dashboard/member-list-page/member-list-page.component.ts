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
    this.user = user;
    this.modalRef = this.modalService.show(modal);
  }
}
