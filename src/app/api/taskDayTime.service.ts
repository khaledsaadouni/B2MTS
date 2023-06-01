import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TaskDayTimeSerice {
    API = 'http://localhost:3000/taskdaytime/'
    constructor(private http: HttpClient) { }
    getAllTaskDayTime() {
        return this.http.get(`${this.API}all`)
    }
    getTaskDayTimeByUser(id) {
        return this.http.get(`${this.API}getByUser/${id}`)
    }
    getTaskDayTimeById(id) {
        return this.http.get(`${this.API}getById/${id}`)
    }
    getTaskDayTimeByDate(datedeb, datefin) {
        return this.http.get(`${this.API}getbydate/${datedeb}/${datefin}`)
    }
    addTaskDayTime(task, id) {
        return this.http.post(`${this.API}add/${id}`, task)
    }
    updateTaskDayTime(id, t) {
        return this.http.patch(`${this.API}update/${id}`, t)
    }
    deleteTaskDayTime(t) {
        return this.http.delete(`${this.API}delete/${t}`)
    }

}
