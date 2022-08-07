import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectapi} from "../model/projectapi";

@Injectable({
  providedIn: 'root'
})
export class ProjService {
  API='https://b2m.herokuapp.com/project/'
  constructor(private http: HttpClient) { }
  getProjects(){
    return this.http.get(`${this.API}all`)
  }
  addProject(p,id){
    return this.http.post(`${this.API}add/${id}`,p)
  }
  deleteproject(id){
    return this.http.delete(`${this.API}delete/${id}`)
  }
  updateProject(id,p,cid){
    return this.http.patch(`${this.API}update/${id}/${cid}`,p)
  }

}
