import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/core/authentication/classes/userAuth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/service/auth.service';
import { LoggedOnUser } from 'src/app/core/user/classes/user';
import { UserService } from 'src/app/core/user/service/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    currentUserToken: UserAuth;
    currentUser: LoggedOnUser = new LoggedOnUser();
    constructor(private router: Router,private authenticationService: AuthService,private userService: UserService) {
        this.authenticationService.currentUserToken.subscribe(x => this.currentUserToken = x);
    }

    logout() {
        this.authenticationService.logout();
        this.currentUser = new LoggedOnUser(); 
        this.router.navigate(['/login']);
    }

    CurrentUserName(){
        if(this.currentUserToken && !this.currentUser.firstName){
            this.userService.getcurrent().pipe(first()).subscribe(user => {
                this.currentUser = user; });            
        }
        return `${this.currentUser.firstName} ${this.currentUser.lastName}`
    
    }

    ngOnInit() {    
    }

}
