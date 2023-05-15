import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pre-registers-list-page',
  templateUrl: './pre-registers-list-page.component.html',
  styleUrls: ['./pre-registers-list-page.component.scss']
})
export class PreRegistersListPageComponent implements OnInit {
  public users;
  modalRef: any;
  user: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
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
  is_approved(id){
    this.authService.approve(id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        location.reload();
      }
    })
  }
  openModal(modal: TemplateRef<any>, user: any ): void {
    this.user = user;
    this.modalRef = this.modalService.show(modal);
  }
}
