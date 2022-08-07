import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../projects.service";
import {moveItemInArray} from "@angular/cdk/drag-drop";

import {LoginService} from "../login.service";
import {ProjService} from "../api/projects.service";

import {Router} from "@angular/router";
import {Projectapi} from "../model/projectapi";
import {TaskService} from "../api/task.service";
import {Taskapi} from "../model/taskapi";
import {ClientService} from "../api/client.service";
import {AuthService} from "../api/auth.service";

@Component({
  selector: 'app-porjects',
  templateUrl: './porjects.component.html',
  styleUrls: ['./porjects.component.css']
})
export class PorjectsComponent implements OnInit {
  SProj;
  STask;
  selected;
  selectedProjectId;
  selectedindex;
  clients;
  click = [];
  cuser;
  list;
  projects;
  devs;

  constructor(private authservice: AuthService, private clientapi: ClientService, private router: Router, private projectser: ProjectsService, private logged: LoginService, private ProjectApi: ProjService, private tasksapi: TaskService) {
  }


  ngOnInit(): void {
    this.authservice.getLoggedUser(sessionStorage.getItem('id')).subscribe((res) => {
      this.cuser = res
    })
    this.authservice.getdevs().subscribe((r) => {
      this.devs = r
    })
    this.clientapi.GetClients().subscribe((res) => {
      this.clients = res
    })
    this.STask = new Taskapi('', '')
    this.SProj = new Projectapi('n', 'n', '', '')
    this.logged.loggin();
    this.projects = this.projectser.addtasks();
    this.ProjectApi.getProjects().subscribe((res) => {
      this.list = res
    })
    for (let i = 0; i < this.projects.length; i++) {
      this.click.push(false)
    }


  }


  drop(event) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    moveItemInArray(this.click, event.previousIndex, event.currentIndex);
  }

  drop1(event) {
    moveItemInArray(this.cuser.tasks, event.previousIndex, event.currentIndex);
  }

  dl= new Date("1899-11-30")

//model1
  blure = false;
  displayStyle = "none";

  openPopup() {
    this.blure = true;
    this.displayStyle = "block";

  }

  save(n, d, s, c) {
    let date=d
    if(!date){
      date="1899-11-30"
    }
    let state=s;
    if(!state){
      state="Pending"
    }
    let p = new Projectapi(n, state, date, c);
    this.ProjectApi.addProject(p, c).subscribe((res) => {

        location.reload();
      }
    )
    this.closePopup();
  }

  closePopup() {
    this.blure = false;
    this.displayStyle = "none";
  }


//model2
  displayStyle2 = "none";

  openPopup2(p) {
    this.blure = true;
    this.SProj = p;
    this.displayStyle2 = "block";

  }

  save2(n, d, s, c) {


    let date=d
    if(!date){
      date="1899-11-30"
    }
    let state=s;
    if(!state){
      state="Pending"
    }
    let p = new Projectapi(n, state, date, '');
    if(!c){
      c=-1;
    }
    this.ProjectApi.updateProject(this.SProj.id, p, c).subscribe((res) => {

        location.reload();
      }
    )
    this.closePopup2();
  }

  closePopup2() {
    this.blure = false;
    this.displayStyle2 = "none";
  }


//model3
  displayStyle3 = "none";
  pindex;

  openPopup3(p) {
    this.blure = true;
    this.pindex = p
    this.displayStyle3 = "block";

  }

  save3() {
    this.ProjectApi.deleteproject(this.pindex).subscribe((re) => {
      location.reload()
    })

    this.closePopup3();
    this.pindex = null

  }

  closePopup3() {
    this.blure = false;
    this.displayStyle3 = "none";


  }

//model4

  displayStyle4 = "none";

  openPopup4(id) {
    this.selectedProjectId = id;
    this.blure = true;
    this.displayStyle4 = "block";

  }

  save4(p, d,) {
    let t = new Taskapi(p, "Pending")
    this.tasksapi.addTask(this.selectedProjectId, t, d).subscribe((re) => {
      location.reload()
    })
    this.closePopup4();
    this.selectedProjectId = null;
  }

  closePopup4() {
    this.blure = false;
    this.displayStyle4 = "none";
    this.selectedProjectId = null;
  }

//model5
  displayStyle5 = "none";

  openPopup5(t) {

    this.blure = true;
    this.STask = t
    this.displayStyle5 = "block";

  }

  save5(p, d, s) {
    let t = new Taskapi(p, s)
    this.tasksapi.updatetask(this.STask.id, t, d).subscribe((re) => {
      location.reload()
    })
    this.closePopup5();
  }

  closePopup5() {
    this.blure = false;
    this.displayStyle5 = "none";

  }

  deletetasskk(id) {
    this.tasksapi.delete(id).subscribe((r) => {
      location.reload()
    })
  }

//model6
  displayStyle6 = "none";

  openPopup6(t) {

    this.blure = true;
    this.STask = t
    this.displayStyle6 = "block";

  }

  save6(p, s) {
    let t = new Taskapi(p, s)
    this.tasksapi.updatetask(this.STask.id, t, -1).subscribe((re) => {
      location.reload()
    })
    this.closePopup6();
  }

  closePopup6() {
    this.blure = false;
    this.displayStyle6 = "none";

  }

}
