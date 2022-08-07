import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API='https://b2m.herokuapp.com/task/'
  constructor(private http: HttpClient) { }
  getTasks(){
    return this.http.get(`${this.API}all`)
  }
  addTask(projid,t,d){
    return this.http.post(`${this.API}add/${projid}/${d}`,t)
  }
  updatetask(id,t ,d){
    return this.http.patch(`${this.API}update/${id}/${d}`,t)
  }
  delete(t){
    return this.http.delete(`${this.API}delete/${t}`)
  }

}
