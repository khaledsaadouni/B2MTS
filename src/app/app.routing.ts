import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { ProfilComponent } from "./profil/profil.component";
import { PorjectsComponent } from "./porjects/porjects.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { TeamComponent } from "./team/team.component";
import { TestCalndrierComponent } from "./test-calndrier/test-calndrier.component";


const APP_ROUTING: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'team', component: TeamComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'projects', component: PorjectsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'calendrier', component: TestCalndrierComponent }
]
export const ROUTING = RouterModule.forRoot(APP_ROUTING);
