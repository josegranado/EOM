import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pre-registers-list-page',
  templateUrl: './pre-registers-list-page.component.html',
  styleUrls: ['./pre-registers-list-page.component.scss']
})
export class PreRegistersListPageComponent implements OnInit {
  public users;
  constructor(
    private userService: UserService,
    private authService: AuthService
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
}
