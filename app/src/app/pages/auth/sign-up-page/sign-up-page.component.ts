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
  public primary = [
    {value: 1, name:"Agricultura"},
    {value: 2, name:"Ganaderia"},
    {value: 3, name:"Pesca"},
    {value: 4, name:"Mineria"},
    {value: 5, name:"Otro"}
  ]
  public industries = [
    {value: 1, name:"Alimentos y bebidas"},
    {value: 2, name:"Automótriz y transporte terrestre"},
    {value: 3, name:"Aviacion"},
    {value: 4, name:"Comercio"},
    {value: 5, name:"Construcción"},
    {value: 6, name:"Diseño y manufactura de productos"},
    {value: 7, name:"Energía, petróleo y gas"},
    {value: 8, name:"Impresión"},
    {value: 9, name:"Industria química"},
    {value: 10, name:"Ganaderia"},
    {value: 11, name:"Madera"},
    {value: 12, name:"Metal"},
    {value: 13, name:"Muebles"},
    {value: 14, name:"Papel"},
    {value: 15, name:"Tabaco"},
    {value: 16, name:"Tecnología"},
    {value: 17, name:"Textil"},
    {value: 18, name:"Transporte y distribución"},
    {value: 19, name:"Otra"},
  ];
  public services = [
    {value: 1, name:"Aerocomercial"},
    {value: 2, name:"Alimentos y bebidas"},
    {value: 3, name:"Arquitectura, ingeniería y construcción"},
    {value: 4, name:"Artes gráficas, impresión"},
    {value: 5, name:"Capacitación"},
    {value: 6, name:"Cine, Gaming y Entretenimiento"},
    {value: 7, name:"Deportes"},
    {value: 8, name:"Diseño"},
    {value: 9, name:"Distribución"},
    {value: 10, name:"E-commerce, plataformas, digitales, programación web"},
    {value: 11, name:"Educación"},
    {value: 12, name:"Empaque"},
    {value: 13, name:"Gobierno"},
    {value: 14, name:"Hotelería y turismo"},
    {value: 15, name:"Joyería y perfumería"},
    {value: 16, name:"Tecnología"},
    {value: 17, name:"Marketing"},
    {value: 18, name:"Medios de comunicación"},
    {value: 19, name:"Moda"},
    {value: 20, name:"Productos y servicios para el hogar"},
    {value: 21, name:"Publicidad"},
    {value: 22, name:"Reciclaje"},
    {value: 23, name:"Restaurantes"},
    {value: 24, name:"Servicios financieros"},
    {value: 25, name:"Textil"},
    {value: 26, name:"Otros"},
  ];
  public departaments = [
    {value: 1, name: "Ventas - Comercial"},
    {value: 2, name: "Gestor de almacén"},
    {value: 3, name: "Marketing"},
    {value: 4, name: "Finanzas"},
    {value: 5, name: "Dirección General"},
    {value: 6, name: "Operaciones"},
    {value: 7, name: "Comprador"}
  ]
  public brokers;
  public ocupations = [
    { value: 1 , name: 'Abogado'},
    { value: 2 , name: 'Actor'},
    { value: 3 , name: 'Administrador'},
    { value: 4 , name: 'Aduanero'},
    { value: 5 , name: 'Aeromozo/Azafata'},
    { value: 6 , name: 'Viajes'},
    { value: 7 , name: 'Corredor de seguros'},
    { value: 8 , name: 'Agricultura'},
    { value: 9 , name: 'Obrero'},
    { value: 10 , name: 'Ama de casa'},
    { value: 11 , name: 'Computacion'},
    { value: 12, name: 'Antropologo'},
    { value: 13, name: 'Archivero'},
    { value: 14, name: 'Armador de Barco'},
    { value: 15, name: 'Arquitecto'},
    { value: 16, name: 'Artesano'},
    { value: 17, name: 'Asistente social'},
    { value: 18, name: 'Autor Literario'},
    { value: 19, name: 'Avicultor'},
    { value: 20, name: 'Cientifico'},
    { value: 21, name: 'Basurero'},
    { value: 22, name: 'Cajero'},
    { value: 23, name: 'Camarero'},
    { value: 24, name: 'Cambista'},
    { value: 25, name: 'Campesino'},
    { value: 26, name: 'Capataz'},
    { value: 27, name: 'Cargador'},
    { value: 28, name: 'Carpintero'},
    { value: 29, name: 'Cerrajero'},
    { value: 30, name: 'Cobrador'},
    { value: 31, name: 'Comerciante'},
    { value: 32, name: 'Conductor'},
    { value: 33, name: 'Conserje'},
    { value: 34, name: 'Constructor'},
    { value: 35, name: 'Contador'},
    { value: 36, name: 'Confeccion de Ropa'},
    { value: 37, name: 'Cosmetologo'},
    { value: 38, name: 'Decorador'},
    { value: 39, name: 'Dentista'},
    { value: 40, name: 'Deportista'},
    { value: 41, name: 'Distribuidor'},
    { value: 42, name: 'Docente'},
    { value: 43, name: 'Economista'},
    { value: 44, name: 'Electricista'},
    { value: 45, name: 'Empresario'},
    { value: 46, name: 'Enfermero'},
    { value: 47, name: 'Ensamblaodr'},
    { value: 48, name: 'Escultor'},
    { value: 49, name: 'Fotografo'},
    { value: 50, name: 'Ganadero'},
    { value: 51, name: 'Gasifitero'},
    { value: 52, name: 'Historiador'},
    { value: 53, name: 'Ingeniero'},
    { value: 54, name: 'Traductor'},
    { value: 55, name: 'Jardinero'},
    { value: 56, name: 'Jockey'},
    { value: 57, name: 'Joyero'},
    { value: 58, name: 'Jubilado'},

    { value: 0 , name: 'Laboratorista'},
    { value: 0 , name: 'Liquidador'},
    { value: 0 , name: 'Maquinista'},
    { value: 0 , name: 'Subastador'},
    { value: 0 , name: 'Mayorista'},
    { value: 0 , name: 'Mecanico'},
    { value: 0 , name: 'Medico'},
    { value: 0 , name: 'Metalurgista'},
    { value: 0 , name: 'Mlitar'},
    { value: 0 , name: 'Nutricionista'},

    { value: 0 , name: 'Obstetriz'},
    { value: 0 , name: 'Organizador'},
    { value: 0 , name: 'Panadero'},
    { value: 0 , name: 'Paramedico'}
  ]
  public sedes: any = [
    {value: 1, name:'Aguascalientes'},
    {value: 2, name:'Baja California'},
    {value: 3, name:'Baja California Sur'},
    {value: 4, name:'Campeche'},
    {value: 5, name:'Coahuila'},
    {value: 6, name:'Colima'},
    {value: 7, name:'Chiapas'},
    {value: 8, name:'Chihuahua'},
    {value: 9, name:'Durango'},
    {value: 10, name:'Distrito Federal'},
    {value: 11, name:'Guanajuato'},
    {value: 12, name:'Guerrero'},
    {value: 13, name:'Hidalgo'},
    {value: 14, name:'Jalisco'},
    {value: 15, name:'México'},
    {value: 16, name:'Michoacán'},
    {value: 17, name:'Morelos'},
    {value: 18, name:'Nayarit'},
    {value: 19, name:'Nuevo León'},
    {value: 20, name:'Oaxaca'},
    {value: 21, name:'Puebla'},
    {value: 22, name:'Querétaro'},
    {value: 23, name:'Quintana Roo'},
    {value: 24, name:'San Luis Potosí'},
    {value: 25, name:'Yucatán'},
    {value: 26, name:'Zacatecas'}
  ];
  public states: any = [
    {value: 1, name:'Aguascalientes'},
    {value: 2, name:'Baja California'},
    {value: 3, name:'Baja California Sur'},
    {value: 4, name:'Campeche'},
    {value: 5, name:'Coahuila'},
    {value: 6, name:'Colima'},
    {value: 7, name:'Chiapas'},
    {value: 8, name:'Chihuahua'},
    {value: 9, name:'Durango'},
    {value: 10, name:'Distrito Federal'},
    {value: 11, name:'Guanajuato'},
    {value: 12, name:'Guerrero'},
    {value: 13, name:'Hidalgo'},
    {value: 14, name:'Jalisco'},
    {value: 15, name:'México'},
    {value: 16, name:'Michoacán'},
    {value: 17, name:'Morelos'},
    {value: 18, name:'Nayarit'},
    {value: 19, name:'Nuevo León'},
    {value: 20, name:'Oaxaca'},
    {value: 21, name:'Puebla'},
    {value: 22, name:'Querétaro'},
    {value: 23, name:'Quintana Roo'},
    {value: 24, name:'San Luis Potosí'},
    {value: 25, name:'Yucatán'},
    {value: 26, name:'Zacatecas'}
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
    sector_option: 'P',
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
}
