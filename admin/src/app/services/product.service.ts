import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public identity: any;
  public token: any;
  public api: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }
  index(page): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token,
      'Content-Type': 'application/json'
    })
    return this.httpClient.get(this.api + '/admin/products/'+page, {headers})
  }
  delete(id): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.delete(environment.apiUrl+'/admin/product/'+id, { headers });
  }
}
