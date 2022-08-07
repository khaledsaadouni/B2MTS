import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  API='https://b2m.herokuapp.com/current/'
  constructor(private http: HttpClient) { }
  getTasks(id){
    return this.http.get(`${this.API}all/${id}`)
  }
  addTask(id,idt){
    return this.http.get(`${this.API}add/${id}/${idt}`)
  }
  // updatetask(id,t){
  //   return this.http.patch(`${this.API}update/${id}`,t)
  // }
  delete(id,t){
    return this.http.delete(`${this.API}delete/${id}/${t}`)
  }
}
