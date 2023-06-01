import { Component, OnInit } from '@angular/core';
import { TaskService } from "../api/task.service";
import { ProjService } from "../api/projects.service";
import { ClientService } from "../api/client.service";
import { DayService } from "../api/day.service";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { Taskapi } from "../model/taskapi";
import { Cleintapi } from "../model/cleintapi";
import { Router } from "@angular/router";
import { AuthService } from "../api/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clients;
  tasks;
  projects;
  cuser;

  constructor(private router: Router, private authService: AuthService, private daysApi: DayService, private taskSer: TaskService, private ProjectApi: ProjService, private ClientApi: ClientService, private tasksapi: TaskService) {

  }

  ngOnInit(): void {
    this.authService.getLoggedUser(sessionStorage.getItem('id')).subscribe((res) => {
      this.cuser = res
    })
    this.taskSer.getTasks().subscribe((res) => {
      this.tasks = res
    })
    this.ProjectApi.getProjects().subscribe((res) => {
      this.projects = res
    })
    this.ClientApi.GetClients().subscribe((res) => {
      this.clients = res
    })
  }

  gettotal(d) {
    /*let s = 0
    for (const dElement of d) {
      for (let i of dElement.days) {
        s += i.coef
      }

    }
    return s*/
  }


  AddTask(p) {
    let t = new Taskapi(p, 'pending')
    this.tasksapi.addTask(-1, t, this.cuser.id).subscribe((re) => {
      location.reload()
    })
  }

  DeleteTask(id) {
    setTimeout(() => {

      this.tasksapi.delete(id).subscribe((e) => {
        location.reload()
      })
    }, 2000)

  }

  drop(event) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

  }

  deleteClient(id) {
    this.ClientApi.deleteClient(id).subscribe((r) => {
      location.reload()
    })
  }

  blure = false;
  displayStyle = "none";

  openPopup() {
    this.blure = true;
    this.displayStyle = "block";

  }

  save(n, e, p) {
    let c = new Cleintapi(n, e, p);
    this.ClientApi.addClient(c).subscribe((r) => {
      location.reload()
    })
    this.closePopup();

  }

  closePopup() {
    this.blure = false;
    this.displayStyle = "none";
  }


}
