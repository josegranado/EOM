import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {

  }
  onSubmit(values: any){
    console.log( values )
    this.authService.login(values).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        
        if ( res.data.role == 1 || res.data.role == 0 ){
          localStorage.setItem('identity', JSON.stringify(res.data));
          localStorage.setItem('token', 'Bearer ' + res.token.token );
          this.router.navigate(['/dashboard'])
        }else{
          window.location.href = <string> 'https://eom.tk'
        } 
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal, tal vez los datos no concuerdan con nuestros registros...',
        })
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal',
      })
    })
  }
}
