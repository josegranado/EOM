import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public identity:any;
  public token:any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = 'Bearer '+ localStorage.getItem('token');
  }
  index(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/categories', { headers });
  }
  store(category:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.post(environment.apiUrl+'/categories', category, { headers })
  }
  show(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/categories/'+id, { headers })
  }
  update(category:any, id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const fd = new FormData();
    if ( category.thumbnail ){
      fd.append('thumbnail', category.thumbnail);
    }
    fd.append('name', category.name);
    fd.append('description', category.description);
    fd.append('_method', 'PUT')
    return this.httpClient.post(environment.apiUrl+'/categories/'+id, fd, { headers })
  }
  destroy(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token
    });
    return this.httpClient.delete(environment.apiUrl+'/categories/'+id, { headers })
  }
}
