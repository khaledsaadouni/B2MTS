import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "./projects.service";
import { LoginService } from "./login.service";
import { AuthService } from "./api/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'B2M';
  side = true;
  get_side(b) {
    this.side = b;
  }

  constructor(private projectser: ProjectsService, public logged: LoginService, public authService: AuthService) {
  }
  ngOnInit(): void {
    if (!this.authService.isAutheticated()) {
      this.authService.logout()
    }
  }
}
