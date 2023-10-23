import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public token;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token =  localStorage.getItem('token');
  }
  public index():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/transactions', {headers} )
  }
  public show(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/transactions/'+id, {headers})
  }
  public store(calification):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(environment.apiUrl+'/transactions', calification, { headers })
  }
  public delete(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.put(environment.apiUrl+'/califications/'+id, { headers })
  }
}
