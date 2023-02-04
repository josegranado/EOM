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
    fd.append('title', product.title);
    fd.append('description', product.description);
    fd.append('category_id', product.category_id)
    fd.append('is_used', product.is_used);
    fd.append('price', product.price);
    fd.append('duration', product.duration);
    console.log( files )
    if ( files ){
      for ( let i = 0; i < files.length; i++ ){
        let number = i+1;
        let key = 'gallery-'+number;
        
        fd.append(key, files[i]);
      }
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
}