import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { PorjectsComponent } from './porjects/porjects.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfilComponent } from './profil/profil.component';
import { ROUTING } from "./app.routing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from './date.pipe';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { TestCalndrierComponent } from './test-calndrier/test-calndrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    TimesheetComponent,
    PorjectsComponent,
    CalendarComponent,
    ProfilComponent,
    DatePipe,
    LoginComponent,
    TeamComponent,
    TestCalndrierComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
