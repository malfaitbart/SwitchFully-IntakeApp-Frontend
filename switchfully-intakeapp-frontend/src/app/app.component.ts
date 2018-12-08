import { Component } from '@angular/core';
import { UserFull } from './core/authentication/classes/userFull';
import { Router } from '@angular/router';
import { AuthService } from './core/authentication/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'switchfully-intakeapp-frontend';
  currentUser: UserFull;

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
