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
  public sector = [];
  public brokers;
  public sedes = [
    { value : 1, name: 'Cualquiera'}
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
    terms: true,
    offers: true,
    notificatons: true,
    terms_and_privacity: true,
    confirm_password: null,
    sector: null,
    sede: null
  };
  typePassword: string = 'password';
  typeConfirmPassword: string = 'password';
  public valid: boolean = false;
  public untouched = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  public step:number= 1;
  back(){
    this.step == this.step--;
    console.log( this.step )
  }
  next(values, status){
    this.user = {
      ...this.user,
      ...values
    }
    if ( this.ConfirmPassword() && status ){
      this.step == this.step++;
    }
  }
  ngOnInit(): void {
    this.authService.getBrokers().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.brokers = res.data;
      }
    })
  }
  onSubmit(values: any){
    console.log( values )
    console.log(this.user);
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
  public inputStyleEmail = 'background-color: #eaeaea !important;';
  public inputStylePassword = 'background-color: #eaeaea !important;';
  public validEmail = false;
  public msgEmail = false;
  public msgPass = false;
  ChangeEmail(){
    let regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.inputStyleEmail = ''
    if ( regex.test(this.user.email) ){
      this.inputStyleEmail = 'background-color: rgba(109,190,101, 0.3) !important';
      this.validEmail = true;
      this.msgEmail = false;
    }else{
      this.inputStyleEmail = 'background-color: rgba(239,60,57, 0.3) !important;'
      this.validEmail = false;
      this.msgEmail = true;
    }
    console.log(this.validEmail)
  }
  public validPassword = false;
  ConfirmPassword(){
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if ( regex.test(this.user.password) && regex.test(this.user.confirm_password) && this.user.password == this.user.confirm_password  ){
      this.validPassword = true;
      this.msgPass = false;
    }else{
      this.validPassword = false;
      this.msgPass = true;
    }
    console.log(this.validPassword)
    return this.validPassword;
  }
  passwordType = 'password';
  passwordTypeConfirm = 'password';
  viewPassword(){
    this.passwordType = 'text';
  }
  noViewPassword(){
    this.passwordType = 'password'
  }

  viewConfirmPassword(){
    this.passwordTypeConfirm = 'text';
  }
  noViewConfirmPassword(){
    this.passwordTypeConfirm = 'password'
  }
  public departaments = [
    {
      value: 1, name: 'Developer'
    }
  ];
}
