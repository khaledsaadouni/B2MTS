import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credapi} from "../model/credapi";
import {Router} from "@angular/router";

const API_LOGIN = 'https://b2m.herokuapp.com/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router,
    private http: HttpClient
  ) {

  }
  register(u){
    return this.http.post(API_LOGIN+'/signuser',u)
}
  getLoggedUser(e){
    return this.http.get(`${API_LOGIN}/${e}`);
  }
  deleteuser(id){
    return this.http.delete(`${API_LOGIN}/delete/${id}`);
  }

  login(e,p): Observable<any> {
    let credentials=new Credapi(e,p);
    return this.http.post(API_LOGIN+'/login', credentials);

  }
  logout() {

    this.router.navigate(['login'])
    localStorage.removeItem('token');
    sessionStorage.clear();

  }
  isAutheticated() {

    return localStorage.getItem('token') && sessionStorage.getItem('id');
  }

  getUsers(){
    return this.http.get(`${API_LOGIN}`);
  }
  update(id,user){
    return this.http.patch(`${API_LOGIN}/update/${id}`,user);
  }
  getusercurrent(id){
    return this.http.get(`${API_LOGIN}/current/${id}`);
  }
  getdevs(){
    return this.http.get(`${API_LOGIN}/u/dev`);
  }
}
