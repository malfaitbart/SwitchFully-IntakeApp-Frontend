import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/core/authentication/classes/userAuth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUserToken: UserAuth;

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
      this.authenticationService.currentUserToken.subscribe(x => this.currentUserToken = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
