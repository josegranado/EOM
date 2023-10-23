import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Ws from "@adonisjs/websocket-client";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public token;
  public socket:any = Ws(environment.socket, {
    path: "ws"
  })
  chat: any;
  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
    this.socket = this.socket.connect();
    this.socket = this.socket.subscribe("chat")
  }
  public index():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/califications', {headers} )
  }
  public show(id):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.get(environment.apiUrl+'/califications/'+id, {headers})
  }
  public store(message):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': this.token
    })
    return this.httpClient.post(environment.apiUrl+'/messages', message, { headers })
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
    this.socket.emit(eventName, data)
  }
}
