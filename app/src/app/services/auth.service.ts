import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public identity:any;
  public token:any;
  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('token');

  }
  getBrokers():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'/brokers')
  }
  loginByToken(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/loginByToken', { headers: headers })
  }
  login(user:any):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(environment.apiUrl+'/login', user, { headers: headers } )
  }
  register(user:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(environment.apiUrl+'/register', user, { headers: headers } )
  }
}

