import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-publish-product-page',
  templateUrl: './publish-product-page.component.html',
  styleUrls: ['./publish-product-page.component.scss']
})
export class PublishProductPageComponent implements OnInit {
  public identity;
  public categories:any = [
    { name: 'Tecnologia', value: 1},
    { name: 'Mascotas', value: 2},
    { name: 'Ropa y Calzado', value: 3},
    { name: 'Juguetes y Vídeojuegos', value: 4},
    { name: 'Música', value: 5},
    { name: 'Niños y Bebés', value: 6},
    { name: 'Deportes', value: 7},
    { name: 'Fotografía', value: 8},
    { name: 'Hecha a Mano', value: 9},
    { name: 'Servicios', value: 10}
  ];
  public options_used:any = [
    { value: 1, name: 'NUEVO'},
    {
      value: 3, name: 'SEMINUEVO'
    },
    { value: 2, name: 'SEGUNDA MANO'},
    { value: 4, name: 'RECICLADO'},
    { value: 5, name: 'MATERIAS PRIMAS'},
  ]
  public duration:number = 5 ;
  productF: boolean = true;
  serviceF: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') as string )
  }

  ngOnInit(): void {
    this.categoryService.index().subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        //this.categories = res.data;
      }
    })
  }
  setDuration(value: number){
    this.duration =  value;
  }
  showForm(type){
    if ( type == 'S'){
      this.productF = false;
      this.serviceF = true;
    }else{
      this.serviceF = false;
      this.productF = true;
    }
  }
  onSubmit( values:any, type ){
    console.log( values )
    let product = {
      duration: this.duration,
      is_used: values?.used?.value,
      ...values,
      category_id: values?.category?.value,
      ubication_id: values?.ubication?.value
    }
    if ( type == 'S'){
      product.type = 2;
    }else{
      product.type = 1;
    }
    console.log( product )
    this.productService.store(product, this.files).subscribe( res => {
      console.log( res )
      console.log( this.files )
      if ( res.status == 201){
        Swal.fire({
          icon: 'success',
          title: '!Felicidades por publicar tu producto!',
          text: 'Te invitamos a esperar a que la comunidad reciba la información de tu producto',
        })
        this.router.navigate(['/']);
      }
    })
  }
  public files:File[] = [];
  public filesSelected: any = [];
  fileSelected:any;
  public file: File;
  onThumbnailSelected( event, i ):void{
    if ( event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      this.files.push(this.file);
      const reader = new FileReader();
      reader.onload = e => this.filesSelected[i-1]=reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.filesSelected)
    }
  }
  public fileServiceSelected = [];
  public fileService;
  public serviceFiles = [];
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
  ]
  onThumbnaiServicelSelected( event, i ):void{
    if ( event.target.files && event.target.files[0]){
      this.fileService = <File>event.target.files[0];
      this.serviceFiles.push(this.fileService);
      const reader = new FileReader();
      reader.onload = e => this.fileServiceSelected[i-1]=reader.result;
      reader.readAsDataURL(this.fileService);
      console.log(this.fileServiceSelected)
    }
  }
  clearService(i){
    if ( i % 2 == 0){
      this.fileServiceSelected[i-1] = 'assets/images/1.jpg';
    }else{
      this.fileServiceSelected[i-1] = 'assets/images/0.jpg';
    }
  }
  clear(i){
    if ( i % 2 == 0){
      this.filesSelected[i-1] = 'assets/images/1.jpg';
    }else{
      this.filesSelected[i-1] = 'assets/images/0.jpg';
    }
  }
  public price;
  onInputChange(){
    if ( this.price < 0){
      this.price = '';
    }
  }
}
