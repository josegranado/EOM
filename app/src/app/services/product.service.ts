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
    this.token = 'Bearer '+ localStorage.getItem('token') as string;
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
    if ( files ){
      for ( let i = 0; i < files.length; i++ ){
        let key = 'gallery-'+i+1;
        
        fd.append(key, files[i]);
      }
    }
    console.log( fd );
    return this.httpClient.post(environment.apiUrl+'/products', fd, { headers })
  }
}
