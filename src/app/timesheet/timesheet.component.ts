import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../projects.service";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { ProjService } from "../api/projects.service";
import { TaskService } from "../api/task.service";
import { DayService } from "../api/day.service";
import { Dateapi } from "../model/dateapi";
import { CurrentService } from "../api/current.service";
import { AuthService } from "../api/auth.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  inputdate;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  days;
  months = ['January', 'February', 'Mars', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  Cmonth = new Date().getMonth() + 1;
  Cyear = new Date().getFullYear();
  selected;

  localday;
  i = 0;
  projects;
  blure = false;
  tasks;
  cur;
  user;
  list;
  constructor(public authService: AuthService, private currentapi: CurrentService, private taskSer: TaskService, private daysApi: DayService, private projectservice: ProjectsService, private logged: LoginService, private router: Router, private ProjectApi: ProjService) {
  }

  ngOnInit(): void {
    this.authService.getLoggedUser(sessionStorage.getItem('id')).subscribe((res) => {
      this.user = res
    })
    this.ProjectApi.getProjects().subscribe((res) => {
      this.list = res
    })
    this.taskSer.getTasks().subscribe((res) => {
      this.tasks = res

    })
    this.authService.getusercurrent(sessionStorage.getItem('id')).subscribe((re) => { this.cur = re })

    this.logged.loggin();
    this.inputdate = this.Cyear + '-' + this.padTo2Digits(this.Cmonth)
    this.days = this.returndays()
    //    this.projects = this.projectservice.projects;
    this.ProjectApi.getProjects().subscribe((res) => {
      this.projects = res
    })
  }


  padTo2Digits(num): any {
    return num.toString().padStart(2, '0');
  }

  getyear(a) {
    this.Cyear = a;
  }

  displayStyle = "none";
  displayStyle2 = "none";
  displayStyle3 = "none";


  alert(t) {

    this.Cyear = Number(t.slice(0, 4));
    this.Cmonth = Number(t.slice(5));

    if (this.Cmonth == 2) {
      if (this.Cyear % 4 == 0) {
        this.days = 29
      } else {
        this.days = 28
      }
    } else if (this.Cmonth == 4 || this.Cmonth == 6 || this.Cmonth == 9 || this.Cmonth == 11) {
      this.days = 30
    } else {
      this.days = 31
    }

  }

  localcoef;

  setCoef(t) {
    this.localcoef = Number(t);
  }

  returndays(): number {

    if (this.Cmonth == 2) {
      if (this.Cyear % 4 == 0) {
        return 29
      } else {
        return 28
      }
    } else if (this.Cmonth == 4 || this.Cmonth == 6 || this.Cmonth == 9 || this.Cmonth == 11) {
      return 30
    } else {
      return 31
    }

  }


  STask;

  openPopup3(d, t) {
    this.localday = d
    this.STask = t
    this.blure = true;
    this.displayStyle3 = "block";

  }

  save3(t) {


    this.daysApi.delete(this.daytask).subscribe((r) => {
    })

    if (t == 1) {


      let d = new Dateapi(this.localday, this.Cmonth, this.Cyear, this.localcoef);

      this.daysApi.addTask(this.STask, d).subscribe((r) => {
      })
    }

    this.closePopup3();
    location.reload()
  }

  closePopup3() {
    this.blure = false;
    this.displayStyle3 = "none";
    this.daytask = null

  }

  daytask;

  delete(id) {
    this.daytask = id

  }

  gettotal(d) {
    let s = 0
    for (const dElement of d) {
      if (dElement.month == this.Cmonth && dElement.year == this.Cyear)
        s += dElement.coef
    }
    return s
  }

  deleting() {
    this.daysApi.delete(this.daytask).subscribe((r) => {
    })
    this.closePopup3()
  }

  openPopup() {
    this.blure = true;
    this.displayStyle = "block";

  }

  save(id) {
    this.currentapi.addTask(this.cur.id, id).subscribe((r) => {
      location.reload()
    });
    this.closePopup();

  }

  closePopup() {
    this.blure = false;
    this.displayStyle = "none";
  }
  openPopup2() {
    this.blure = true;
    this.displayStyle2 = "block";

  }

  save2(id) {
    this.currentapi.addTask(this.cur.id, id).subscribe((r) => {
      location.reload()
    });
    this.closePopup2();

  }

  closePopup2() {
    this.blure = false;
    this.displayStyle2 = "none";
  }

  deleteTask(id) {
    this.currentapi.delete(this.cur.id, id).subscribe((r) => {
      location.reload()
    });
  }
}
