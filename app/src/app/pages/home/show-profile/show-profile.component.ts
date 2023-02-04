import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
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
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private commentService: CommentService,
    private activated: ActivatedRoute,
    private twinService: TwinService,
    private router: Router
    ) { 
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
  public id;
  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.userService.show(this.id).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.identity = res.data;
        this.productService.allByUser(this.identity.id).subscribe( res =>{
          console.log(res )
          if ( res.status == 201){
            this.products = res.data;
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
}
