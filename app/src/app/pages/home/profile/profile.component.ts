import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CalificationService } from 'src/app/services/calification.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public identity;
  public apiUrl = environment.apiUrl;
  public API_ENDPOINT = environment.apiUrl;
  public products;
  public profile;
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private commentService: CommentService,
    private transactionService: TransactionService,
    private calificationService: CalificationService,
    private authService: AuthService
    ) { 
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }
  public comments;
  publishComment(product_id, value){
    console.log( value )
    this.commentService.store(product_id, value).subscribe( res =>{
      console.log( res )
      if ( res.status == 201 ){
        location.reload();
      }
    })
  }
  public account;
  public boughts_data;
  public sales_data;
  public formUbication = false;
  public allProducts;
  public paper_talk_length = 0;
  public papers;
  public valFiles;
  public cont_files;
  ngOnInit(): void {
    this.authService.loginByToken().subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.identity = res.data;
        this.profile = res.data.profile;
        if ( this.profile?.description ){
          this.description = this.profile.description;
          this.length_description = this.profile.description.length;
        }
        if ( this.profile?.state ){
          this.state = this.states.filter( (state ) => state.value === this.profile?.state );
          this.state = this.state[0];
          console.log(this.state)
        }
        if ( this.profile?.city){
          this.city = this.profile?.city;
        }
        if ( this.profile?.gallery ){
          for ( let i = 0; i < 10; i++){
            if ( i % 2 == 0){
              this.filesSelected[i] = 'assets/images/0.jpg'
            }else{
              this.filesSelected[i] = 'assets/images/1.jpg'
            }
          }
          this.papers = JSON.parse(this.profile?.gallery);
          this.papers = this.papers.map((image, index) => this.filesSelected[index] = this.apiUrl+'/files/papers/'+ image )
          //this.filesSelected = this.papers;
          console.log(this.filesSelected)
          this.valFiles = true;
          this.cont_files = this.filesSelected.length;
        }
        if ( this.filesSelected?.length == 0 ){
          this.valFiles = false;
          this.cont_files = 0;
          for ( let i = 0; i < 11; i++){
            if ( i % 2 == 0){
              this.filesSelected[i] = 'assets/images/0.jpg'
            }else{
              this.filesSelected[i] = 'assets/images/1.jpg'
            }
          }
        }
        console.log(this.filesSelected)
      }
    })
    this.productService.allByUser(this.identity.id).subscribe( res =>{
      console.log(res )
      if ( res.status == 201){
        this.products = res.data;
        this.allProducts = res.data,
        this.transactionService.index().subscribe( res => {
          console.log( res )
          if (res.status == 201){
            
            this.boughts = res.data.boughts;
            this.boughts_data = this.boughts.data;
            this.sales = res.data.sales;
            this.sales_data = this.sales.data;
            this.account = res.data.account;
            console.log(this.boughts)
            console.log(this.sales)
          } 
        })
      }
    })
  }
  public active = 1;
  public avatar: File;
  public avatarSelected;
  public compras: boolean = true;
  public ventas: boolean = false;
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
  public boughts;
  public sales;    
  operations(){
    console.log('operations works')
  }
  calification(product, values){
    console.log( values )
    let calification;
    if ( product.buyer.id == this.identity.id ){
      calification = {
        buyer_id: this.identity.id,
        saler_id: product.user_id,
        ...values
      }
    }else{
      calification = {
        saler_id: this.identity.id,
        buyer_id: product.calification.buyer_id,
        ...values
      }
    }
    this.calificationService.update(product.id, calification ).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  public formInfo = false;
  onEditInfo(){
    this.formInfo = true;
  }
  setDescription(){
    this.length_description = this.description.length;
  }
  public description = '';
  public length_description = 0;
  public state;
  public city;
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
  filterEvent(filter){
    console.log(filter)
    this.products = this.allProducts;
    if (filter.category ){
      this.products = this.products.filter( product => product.category_id == filter.category.value )
    }
  
    if ( filter.from_price ){
      this.products = this.products.filter( product => product.price > filter.from_price )
    }
    if ( filter.to_price ){
      this.products = this.products.filter( product => product.price < filter.to_price )
    }
    if ( filter.ubication ){
      this.products = this.products.filter(product => product.ubication == filter.ubication )
    }
    if ( filter.use ){
      this.products = this.products.filter( product => product.is_used == filter.use )
    }
  }
  onThumbnailSelected( event, i ):void{
    if ( event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      this.files[i] = this.file;
      const reader = new FileReader();
      reader.onload = e => this.filesSelected[i]=reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.filesSelected)
      this.cont_files++;
    }
  }
  public files:File[] = [];
  public filesSelected: any = [];
  fileSelected:any;
  public file: File;
  clear(i){
    this.cont_files--;
    if ( i % 2 == 0){
      this.filesSelected[i] = 'assets/images/1.jpg';
    }else{
      this.filesSelected[i] = 'assets/images/0.jpg';
    }
  }
  uploadPapers(){
    this.userService.update(null, this.files).subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  onThumbnailSelectedGallery( event, i ):void{
    if ( event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      this.files.push(this.file);
      const reader = new FileReader();
      reader.onload = e => this.filesSelected[i]=reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.filesSelected)
    }
  }
  onUpDescription(){
    let profile = {
      description: this.description
    }
    if ( this.length_description <= 100){
      this.userService.update(profile, null).subscribe( res => {
        console.log( res )
        if ( res.status == 201){
          location.reload();
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal, la información de perfil excede los 100 Caracteres...',
      })
    }
  }
  onUpUbication(){
    console.log(this.state)
    let profile = {
      city: this.city,
      state: this.state.value
    }
    if ( this.city && this.state ){
      this.userService.update(profile, null).subscribe( res => {
        console.log( res )
        if ( res.status == 201){
          location.reload();
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal, no nos ha brindado información correcta respecto a su ubicación...',
      })
    }
  }
}
