import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public identity:any;
  public token:any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = 'Bearer '+ localStorage.getItem('token');
  }
  public show(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.httpClient.get(environment.apiUrl+'/users/'+id, { headers })
  }
  public uploadAvatar( avatar: File ): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const fd = new FormData();
    if ( avatar ){
      fd.append('avatar', avatar );
    }
    return this.httpClient.post(environment.apiUrl + '/users/avatar', fd, { headers })
  }
  public uploadCover( cover: File ): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const fd = new FormData();
    if ( cover ){
      fd.append('cover', cover );
    }
    return this.httpClient.post(environment.apiUrl + '/users/cover', fd, { headers })
  }
}
