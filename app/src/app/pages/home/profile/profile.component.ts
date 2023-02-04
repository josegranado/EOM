import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
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
  public API_ENDPOINT = environment.apiUrl;
  public products;
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private commentService: CommentService,
    private transactionService: TransactionService
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
  ngOnInit(): void {
    this.productService.allByUser(this.identity.id).subscribe( res =>{
      console.log(res )
      if ( res.status == 201){
        this.products = res.data;
        this.transactionService.index().subscribe( res => {
          console.log( res )
          if (res.status == 201){
            
            this.boughts = res.data.boughts;
            this.sales = res.data.sales;
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
}
