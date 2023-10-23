import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public identity: any;
  public token: any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }
  index(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/users', { headers })
  }
  show(id:number ): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/users/'+id, { headers })
  }
  brokers():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/brokers', { headers })
  }
  update(id, user ):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.put(environment.apiUrl+'/admin/members/'+id, user, { headers })
  }
  delete(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.delete(environment.apiUrl+'/admin/members/'+id, { headers })
  }
  store(user):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.post(environment.apiUrl+'/admin/members/',user, { headers })
  }
}
