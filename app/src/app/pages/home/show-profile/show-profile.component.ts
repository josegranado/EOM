import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { FollowService } from 'src/app/services/follow.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { TwinService } from 'src/app/services/twin.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {
  public identity;
  public apiUrl = environment.apiUrl;
  public API_ENDPOINT = environment.apiUrl;
  public products;
  papers: any;
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private commentService: CommentService,
    private activated: ActivatedRoute,
    private twinService: TwinService,
    private router: Router,
    private notificationService: NotificationService,
    private followService: FollowService
    ) { 
      this.identityStorage = JSON.parse(localStorage.getItem('identity') as string)
  }
  public identityStorage;
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
  public id;
  public follows;
  public followers; 
  public allProducts;
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
    if ( filter.type ){
      this.products = this.products.filter( product => product.type == filter.type )
    }
  }
  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.userService.show(this.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.identity = res.data;
        this.papers = JSON.parse(res.data.profile.gallery)
        console.log(this.papers)
        this.productService.allByUser(this.identity.id).subscribe( res =>{
          console.log(res )
          if ( res.status == 201){
            this.products = res.data;
            this.allProducts = this.products;
            this.followService.index( this.id ).subscribe( res => {
              console.log( res )
              if ( res.status == 201){
                this.follows = res.data;
                this.followers = res.data.followers._followers;
                this.followeds = res.data.followeds._followeds,
                this.count_followeds = res.data.followeds.count;
                this.count_followers = res.data.followers.count;
                console.log(this.count_followeds)
                console.log(this.count_followers)
              }
            })
          }
        })
      }
    })
  }
  public count_followers;
  public count_followeds;
  public followeds;
  public active = 1;
  public avatar: File;
  public avatarSelected;
  public compras: boolean = true;
  public ventas: boolean = false;
  openTwin(){
    let twin = {
      to: this.identity.id,
    }
    this.twinService.store(twin).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.router.navigate(['/notifications']);
      }
    })
  }
  follow(){
    let notification = {
      from: this.identityStorage.id,
      to: this.identity.id,
      type: 3
    }
    this.followService.store(this.identity.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.notificationService.emit('send-notification', notification);
        location.reload();
      }
    })
  }
  unfollow(){
    this.followService.delete( this.identity.id ).subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        location.reload();
      }
    })
  }
}
