import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DayService {
  API='https://b2m.herokuapp.com/days/'
  constructor(private http: HttpClient) { }
  getDays(){
    return this.http.get(`${this.API}all`)
  }
  addTask(taskid,t){
    return this.http.post(`${this.API}add/${taskid}`,t)
  }
  getdaytask(t,d,m,y){
    return this.http.get(`${this.API}${t}/${d}/${m}/${y}`)
  }
  delete(id){
    return this.http.delete(`${this.API}delete/${id}`)
  }
}
