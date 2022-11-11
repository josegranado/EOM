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
    { name: 'Tecnologia', value: 1}
  ];
  public options_used:any = [
    { value: 0, name: 'NUEVO'},
    { value: 1, name: 'USADO'},
  ]
  public duration:number = 5 ;
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
  onSubmit( values:any ){
    console.log( values )
    let product = {
      duration: this.duration,
      is_used: values.used.value,
      ...values,
      category_id: values.category.value
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
  clear(i){
    if ( i % 2 == 0){
      this.filesSelected[i-1] = 'assets/images/1.jpg';
    }else{
      this.filesSelected[i-1] = 'assets/images/0.jpg';
    }
  }
}
