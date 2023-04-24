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
  public update( profile, files ): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const fd = new FormData();
    if ( profile?.description ){
      fd.append('description', profile.description);
    }
    if ( profile?.city ){
      fd.append('city', profile.city);
    }
    if ( profile?.state ){
      fd.append('state', profile.state)
    }
    
    if ( files ){
      fd.append('gallery', '1');
      for ( let i = 0; i < files.length; i++ ){
        let number = i+1;
        let key = 'gallery-'+number;
        
        fd.append(key, files[i]);
      }
    }
    return this.httpClient.put(environment.apiUrl  + '/users', fd, { headers } )
  }
}
