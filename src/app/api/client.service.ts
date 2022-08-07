import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API='https://b2m.herokuapp.com/client/'
  constructor(private http: HttpClient) { }
  GetClients(){
    return this.http.get(`${this.API}all`)
  }
  getClient(id){
    return this.http.get(`${this.API}${id}`)
  }
  addClient(c){
    return this.http.post(`${this.API}add`,c)
  }
  deleteClient(c){
    return this.http.delete(`${this.API}delete/${c}`)
  }

}
