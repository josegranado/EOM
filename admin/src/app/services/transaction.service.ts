import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
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
      'Authorization': this.token
    })
    return this.httpClient.get(this.api + '/admin/transactions/'+page, {headers})
  }
  asignations(page): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(this.api + '/admin/transactions/asignations/'+page, {headers})
  }
  store(asignation): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(this.api + '/admin/transactions/asignations/', asignation, {headers})
  }
}
