import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API = 'http://localhost:3000/task/'
  constructor(private http: HttpClient) { }
  getTasks() {
    return this.http.get(`${this.API}all`)
  }
  getTaskById(id) {
    return this.http.get(`${this.API}getById/${id}`)
  }
  getTaskByUser(id) {
    return this.http.get(`${this.API}getByIdUser/${id}`)
  }
  addTask(projid, t, d) {
    return this.http.post(`${this.API}add/${projid}/${d}`, t)
  }
  updatetask(id, t, d) {
    return this.http.patch(`${this.API}update/${id}/${d}`, t)
  }
  delete(t) {
    return this.http.delete(`${this.API}delete/${t}`)
  }

}
