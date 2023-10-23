import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { TwinService } from 'src/app/services/twin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit {
  public uuid;
  public itemSelected;
  public API_ENDPOINT = environment.apiUrl;
  public identity;
  constructor(
    private productService: ProductService,
    private router: Router,
    private activated: ActivatedRoute,
    private commentService: CommentService,
    private transactionService: TransactionService,
    private notificationService: NotificationService,
    private twinService: TwinService
    ) { 
      this.identity = JSON.parse(localStorage.getItem('identity'))
    }
  public product;
  public gallery;
  public comments;
  ngOnInit(): void {
    this.uuid = this.activated.snapshot.params['uuid'];
    console.log(this.uuid);
    this.productService.show(this.uuid).subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        this.product = res.data;
        this.gallery = JSON.parse(this.product.gallery)
        this.itemSelected = this.product.thumbnail
        this.comments = this.product.comments
        console.log(this.gallery)
      }
    })
  }
  changeItemGallery(pic){
    this.itemSelected = pic;
  }
  publishComment(value){
    console.log( value )
    this.commentService.store(this.product.id, value).subscribe( res =>{
      console.log( res )
      if ( res.status == 201 ){
        location.reload();
      }
    })
  }
  buy(){
    let transaction = {
      saler_id: this.product.user_id,
      amount: this.product.price,
      product_id: this.product.id
    };
    let notification = {
      from: this.identity.id,
      to: this.product.user_id,
      type: 1 
    }
    this.transactionService.store(transaction).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        let identity = JSON.parse(localStorage.getItem('identity'))
        console.log( identity )
        identity.account = res.data;
        console.log( identity )
        localStorage.removeItem('identity');
        localStorage.setItem('identity', JSON.stringify(identity));
        this.notificationService.emit('notification', notification );
        Swal.fire({
          icon: 'success',
          title: '!Felicidades por comprar este producto!',
          text: 'Te invitamos a esperar a que el vendedor sea notificado de tu compra y tendrás respuesta sobre la entrega de tu producto',
        })
        this.router.navigate(['/'])
        
      }
    })
  }
  sell(){
    let transaction = {
      saler_id: this.identity.id,
      amount: this.product.price,
      product_id: this.product.id
    };
    let notification = {
      from: this.product.user_id,
      to: this.identity.id,
      type: 1 
    }
    this.transactionService.store(transaction).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        let identity = JSON.parse(localStorage.getItem('identity'))
        console.log( identity )
        identity.account = res.data;
        console.log( identity )
        localStorage.removeItem('identity');
        localStorage.setItem('identity', JSON.stringify(identity));
        this.notificationService.emit('notification', notification );
        Swal.fire({
          icon: 'success',
          title: '!Felicidades por comprar este producto!',
          text: 'Te invitamos a esperar a que el vendedor sea notificado de tu compra y tendrás respuesta sobre la entrega de tu producto',
        })
        this.router.navigate(['/'])
        
      }
    })
  }
  favorite(id){
    let notification = {
      identity: this.identity,
      to: this.product.user_id,
      type: 2 
    }
    this.productService.favorite(id).subscribe( res => {
      console.log( res )
      if ( res.status == 201 ){
        this.notificationService.emit('notification', notification );
        this.router.navigate(['/favorites'])
      }
    })
  }
  like(id){
    this.productService.like(id).subscribe( res => {
      console.log(res)
      if ( res.status == 201){
        location.reload();
      }
    })
  }
  dislike(id){
    this.productService.dislike(id).subscribe( res => {
      console.log(res)
      if ( res.status == 201){
        //location.reload();
      }
    })
  }
  share(id){}
  twin(id){
    let twin = {
      to: id,
      from: this.identity.id
    }
    this.twinService.store(twin).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.router.navigate(['/twins']);
      }
    })
  }
}
