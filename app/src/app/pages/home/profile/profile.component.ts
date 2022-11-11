import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public identity;
  public apiUrl = environment.apiUrl;
  constructor(private userService: UserService) { 
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }

  ngOnInit(): void {
  }
  public active = 1;
  public avatar: File;
  public avatarSelected;
  uploadAvatar(event ){
    if ( event.target.files && event.target.files[0]){
      this.avatar = <File>event.target.files[0];
      this.userService.uploadAvatar( this.avatar ).subscribe( res => {
        console.log( res )
          if ( res.status == 201){
            localStorage.removeItem('identity');
            localStorage.removeItem('token');
            localStorage.setItem('token', res.token.token )
            localStorage.setItem('identity', JSON.stringify(res.data))
            location.reload();
          }
      })
    }
  }
  public cover: File;
  public coverSelected;
  uploadCover( event ){
    if ( event.target.files && event.target.files[0]){
      this.cover = <File>event.target.files[0];
      this.userService.uploadCover( this.cover ).subscribe( res => {
        console.log( res )
        if ( res.status == 201){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          localStorage.setItem('token', res.token.token )
          localStorage.setItem('identity', JSON.stringify(res.data))
          location.reload();
        }
    })
    }
}
    

}
