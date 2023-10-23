import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public identity: any;
  public token: any;
  public api: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }
  index(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/dashboard', { headers: headers })
  }
}
