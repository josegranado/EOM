import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public identity:any;
  public token:any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = 'Bearer '+ localStorage.getItem('token');
  }
  allByUser(id): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/users/'+id+'/products', { headers })
  }
  index():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/products', { headers })
  }
  store(product:any, files: File[]): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const fd = new FormData();
    if ( product.title ){
      fd.append('title', product.title);
    }
    if ( product.description){
      fd.append('description', product.description);
    }
    if ( product.category_id ){
      fd.append('category_id', product.category_id)
    }
    if ( product.is_used){
      fd.append('is_used', product.is_used);
    }
    if ( product.price ){
      fd.append('price', product.price);
    }
    if ( product.duration ){
      fd.append('duration', product.duration);
    }
    if ( product.ubication_id ){
      fd.append('ubication_id', product.ubication_id);
    }
    if ( product.type ){
      fd.append('type', product.type )
    }
    if ( files ){
      fd.append('gallery', '1')
      for ( let i = 0; i < files.length; i++ ){
        let number = i+1;
        let key = 'gallery-'+number;
        
        fd.append(key, files[i]);
      }
    }else{
      fd.append('gallery', '0')
    }
    console.log( files )
    console.log( fd );
    return this.httpClient.post(environment.apiUrl+'/products', fd, { headers })
  }
  show(uuid:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/products/'+uuid, { headers });
  }
  favorites(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/products/favorites', { headers });
  }
  favorite(id): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/products/'+id+'/favorites', { headers });
  }
}
