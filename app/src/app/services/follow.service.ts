import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public token;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token =  localStorage.getItem('token');
  }
  public index(user_id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(environment.apiUrl+'/follows/all', { user_id: user_id }, {headers} )
  }
  public show(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/follows/'+id, {headers})
  }
  public store(followed_id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(environment.apiUrl+'/follows', { followed_id: followed_id}, { headers })
  }
  public delete(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.delete(environment.apiUrl+'/follows/'+id, { headers })
  }
}
