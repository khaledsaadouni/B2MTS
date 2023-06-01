import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskDayTimeSerice } from '../api/taskDayTime.service';
import { TaskService } from '../api/task.service';
import { taskdaytime } from './taskDayTimeInterface';
import * as moment from 'moment-timezone';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-test-calndrier',
  templateUrl: './test-calndrier.component.html',
  styleUrls: ['./test-calndrier.component.css']
})
export class TestCalndrierComponent implements OnInit {
  constructor(private authservice: AuthService, private taskDayTimeService: TaskDayTimeSerice, private taskSerice: TaskService) { }
  displayStyle = "none";
  blure = false;
  displayStyle2 = "none";
  blure2 = false;
  displayStyle3 = "none";
  blure3 = false;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    height: '700px',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    dateClick: this.handleTimeClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    navLinks: true,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };
  handleTimeClick(info: any) {
    console.log('Date clicked:', info.dateStr);
    console.log('Date clicked:', info);
    this.blure2 = true;
    this.displayStyle2 = "block";
    const date = new Date(info.dateStr);
    this.infoDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    this.infoTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' });
    this.info = info.dateStr
    this.authservice.getLoggedUser(sessionStorage.getItem('id')).subscribe((res2: any) => {
      console.log(res2.id);
      const role = res2.role;
      if (role === 'Admin') {
        this.taskSerice.getTasks().subscribe((res) => {
          this.tasks = res
        })
      } else {
        this.taskSerice.getTaskByUser(res2.id).subscribe((res) => {
          this.tasks = res
        })
      }
    })
  }
  savetask(startdate, endtime, task) {
    console.log("save")
    const endDate = new Date(startdate);
    const [hours, minutes] = endtime.split(':');
    endDate.setHours(Number(hours), Number(minutes), 0);
    const startDateTime = new Date(startdate);
    const durationMs = endDate.getTime() - startDateTime.getTime();
    const hoursDuration = Math.floor(durationMs / (1000 * 60 * 60));
    const minutesDuration = Math.floor((durationMs / (1000 * 60)) % 60);
    const duration = `${hoursDuration} hours and ${minutesDuration} minutes`;
    const newtask = new taskdaytime(startdate, endDate, duration);
    this.taskDayTimeService.addTaskDayTime(newtask, task).subscribe((r) => {
      location.reload()
    });
    this.closePopup2();
  }
  tasks: any
  info: any
  infoDate: string
  infoTime: string
  eventDayTime: any
  id: number
  datedebut: string
  datefin: string
  dure: string
  taskstate: any
  title: string
  CurrentRole: any;

  handleEventClick(arg: EventClickArg) {
    const datedebut = (arg.event.start)
    const datefin = (arg.event.end);
    this.title = (arg.event.title)
    this.taskDayTimeService.getTaskDayTimeByDate(datedebut, datefin).subscribe((res) => {
      this.eventDayTime = res[0]
      this.id = this.eventDayTime.id;
      // for the start date
      const datedeb = new Date(this.eventDayTime.dateDebut);
      const dateStringdeb = datedeb.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const timeStringdeb = datedeb.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.datedebut = dateStringdeb + "     at  :  " + timeStringdeb
      //for the end date 
      const datefin = new Date(this.eventDayTime.dateFin);
      const dateStringfin = datefin.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const timeStringfin = datefin.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }); this.datefin = this.eventDayTime.dateFin
      this.datefin = dateStringfin + "      at  :  " + timeStringfin

      this.dure = this.eventDayTime.duration
      this.taskstate = this.eventDayTime.task.state
    })
    this.blure = true;
    this.displayStyle = "block";
  }
  closePopup1() {
    this.blure = false;
    this.displayStyle = "none";
  }
  closePopup2() {
    this.blure2 = false;
    this.displayStyle2 = "none";
  }
  closePopup3() {
    this.blure3 = false;
    this.displayStyle3 = "none";
  }
  ngOnInit() {
    this.authservice.getLoggedUser(sessionStorage.getItem('id')).subscribe((res2: any) => {
      console.log(res2.id);
      const role = res2.role;
      if (role === 'Admin') {
        setTimeout(() => {
          return this.taskDayTimeService.getAllTaskDayTime().subscribe((res: any) => {
            console.log(res);
            for (const resultat of res) {
              this.taskSerice.getTaskById(resultat.task.id).subscribe((result: any) => {
                let title1 = "this is Task : " + result.task + "  for project   :  " + result.project.name + "  With deadline : " + result.project.DL;
                let date1 = resultat.dateDebut;
                let date2 = resultat.dateFin;
                let mycolor = null;
                if (result.state == "Ongoing") {
                  mycolor = 'blue'
                }
                if (result.state == "Done") {
                  mycolor = 'green'
                }
                if (result.state == "Pending") {
                  mycolor = 'gold'
                }
                if (result.state == "Canceled") {
                  mycolor = 'red'
                }
                this.Events.push({ color: mycolor, title: title1 + '\n\n', start: date1, end: date2, idtasktimedate: resultat.id });
              })
              console.log(this.Events)
            }
          });
        }, 2200);
        setTimeout(() => {
          this.calendarOptions = {
            initialView: 'timeGridWeek',
            dateClick: this.handleTimeClick.bind(this),
            events: this.Events,
          };
        }, 2500);
      } else {
        setTimeout(() => {
          return this.taskDayTimeService.getTaskDayTimeByUser(res2.id).subscribe((res: any) => {
            console.log(res);
            for (const resultat of res) {
              this.taskSerice.getTaskById(resultat.task.id).subscribe((result: any) => {
                let title1 = "this is Task : " + result.task + "  for project   :  " + result.project.name + "  With deadline : " + result.project.DL;
                let date1 = resultat.dateDebut;
                let date2 = resultat.dateFin;
                let mycolor = null;
                if (result.state == "Ongoing") {
                  mycolor = 'blue'
                }
                if (result.state == "Done") {
                  mycolor = 'green'
                }
                if (result.state == "Pending") {
                  mycolor = 'gold'
                }
                if (result.state == "Canceled") {
                  mycolor = 'red'
                }
                this.Events.push({ color: mycolor, title: title1 + '\n\n', start: date1, end: date2, idtasktimedate: resultat.id });
              })
              console.log(this.Events)
            }
          });
        }, 2200);
        setTimeout(() => {
          this.calendarOptions = {
            initialView: 'timeGridWeek',
            dateClick: this.handleTimeClick.bind(this),
            events: this.Events,
          };
        }, 2500);
      }
    });

  }
  deletetasskk(id) {
    console.log("deleted : " + id);
    this.taskDayTimeService.deleteTaskDayTime(id).subscribe((r) => {
      location.reload()
    })
  }
  Onclikupdatetasskk(id) {
    console.log("updated : " + id);
    this.displayStyle3 = "block";
    this.blure3 = true;
    this.taskSerice.getTasks().subscribe((res) => {
      this.tasks = res
    })
    this.closePopup1();

  }
  taskToupdate: any
  updateTask(id, starttime, endtime, idTask) {
    this.taskDayTimeService.getTaskDayTimeById(id).subscribe((res) => {
      this.taskToupdate = res
      if (starttime != "") {
        const date = new Date(this.taskToupdate.dateDebut)
        const [hourStr, minuteStr] = starttime.split(':')
        date.setHours(parseInt(hourStr, 10))
        date.setMinutes(parseInt(minuteStr, 10))
        this.taskToupdate.dateDebut = date;
      }
      if (endtime != "") {
        const date = new Date(this.taskToupdate.dateFin)
        const [hourStr, minuteStr] = endtime.split(':')
        date.setHours(parseInt(hourStr, 10))
        date.setMinutes(parseInt(minuteStr, 10))
        this.taskToupdate.dateFin = date;
      }
      const datedeb = new Date(this.taskToupdate.dateDebut)
      const datefin = new Date(this.taskToupdate.dateFin)
      const durationMs = datefin.getTime() - datedeb.getTime();
      const hoursDuration = Math.floor(durationMs / (1000 * 60 * 60));
      const minutesDuration = Math.floor((durationMs / (1000 * 60)) % 60);
      const duration = `${hoursDuration} hours and ${minutesDuration} minutes`;
      this.taskSerice.getTaskById(2).subscribe((res2) => {
        this.taskToupdate.task = res2
      })
      this.taskToupdate.duration = duration;
      console.log("after update ", this.taskToupdate)
      this.taskDayTimeService.updateTaskDayTime(id, this.taskToupdate).subscribe((res) => {
        location.reload();
      })
      this.closePopup3();
    })
    this.blure3 = false;
    this.displayStyle3 = "none";
  }
}
/*
    setTimeout(() => {
      return this.taskDayTimeService.getAllTaskDayTime().subscribe((res: any) => {
        for (const resultat of res) {
          this.taskSerice.getTaskById(resultat.task.id).subscribe((result: any) => {
            let title1 = "this is Task : " + result.task + "  for project   :  " + result.project.name + "  With deadline : " + result.project.DL;
            let date1 = resultat.dateDebut;
            let date2 = resultat.dateFin;
            let mycolor = null;
            if (result.state == "Ongoing") {
              mycolor = 'blue'
            }
            if (result.state == "Done") {
              mycolor = 'green'
            }
            if (result.state == "Pending") {
              mycolor = 'gold'
            }
            if (result.state == "Canceled") {
              mycolor = 'red'
            }
            this.Events.push({ color: mycolor, title: title1 + '\n\n', start: date1, end: date2, idtasktimedate: resultat.id });
          })
          console.log(this.Events)
        }
      });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'timeGridWeek',
        dateClick: this.handleTimeClick.bind(this),
        events: this.Events,
      };
    }, 2500);
*/