import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public token;
  public apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {
    this.token = 'Bearer '+ localStorage.getItem('token');
  }
  index():Observable<any>{
    const headers = new HttpHeaders({
      Authorization: this.token
    })
    return this.http.get(this.apiUrl+'/accounts', { headers })
  }
}
