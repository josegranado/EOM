import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  public sectors = [
   {value: 1, name:"Tecnología"},
   {value: 2, name:"Naturaleza"},
  ]
  public states = [
    {
      value: 1, name:"Guanajuato"
    },
    {
      value: 2, name:"Oaxaca"
    }
  ];
  public genders = [
    {
      value: 1, name:"Masculino"
    },
    {
      value: 2, name:"Femenino"
    },
    {
      value: 3, name:"No binario"
    }
  ];
  public user:any = {
    password: '',
    first_name: '',
    last_name: '',
    ocupation: '',
    email: '',
    phone_number: '',
    phone_local_number: '',
    name: '',
    rfc: '',
    state: null,
    n_employees: null,
    departament: null,
    broker_name: '',
    question_1: '',
    question_2: '',
    terms: null,
    offers: null,
    notificatons: null,
    terms_and_privacity: null
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  public step:number= 0;
  back(){
    this.step == this.step--;
    console.log( this.step )
  }
  next(values, status){
    this.step == this.step++;
  }
  ngOnInit(): void {
  }
  onSubmit(values: any){
    this.authService.register(this.user).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        
        Swal.fire({
          icon: 'success',
          title: '!Felicidades por registrarte!',
          text: 'Tenemos que corrobar la información suministrada para su aprobación, espere nuestro correo electrónico',
        })
        this.router.navigate(['/'])
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal con tu registro',
        })
      }
    }, error => {
        console.log( error ) 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal con tu registro',
        })
    })
  }
}
