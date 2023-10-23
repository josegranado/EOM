import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Ws from "@adonisjs/websocket-client";
@Injectable({
  providedIn: 'root'
})
export class TwinService {
  public token;
  public socket:any = Ws(environment.socket, {
    path: "ws"
  })
  chat: any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }
  public index():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/twins', {headers} )
  }
  public show(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/twins/'+id, {headers})
  }
  public store(twin):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(environment.apiUrl+'/twins', twin, { headers })
  }
  public delete(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.put(environment.apiUrl+'/califications/'+id, { headers })
  }
  listen(eventName: string):Observable<any>
  {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) =>{
        Subscriber.next(data)
      })
    })
  }
  emit(eventName:string, data:any)
  {
    this.socket.connect();
    this.chat = this.socket.subscribe("chat")
    this.chat.emit(eventName, data)
  }
}
