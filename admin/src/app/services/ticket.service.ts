import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public identity: any;
  public token: any;
  public api: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }
  index():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token,
      'Content-Type': 'application/json'
    })
    return this.httpClient.get(this.api + '/admin/reports', {headers})
  }
}
