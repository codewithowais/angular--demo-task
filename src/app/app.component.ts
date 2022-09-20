import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './interfaces/user/user';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedInUser: IUser = {} as IUser;
  public isLoggedIn = false;
  title = 'angular-task';

  constructor(
    private auth: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.auth.appLoggedInUser.subscribe(
      user => {
        this.loggedInUser = user;
        this.isLoggedIn = !!user.name;
      }
    );
  }

  logout(): void {
    this.auth.logout();
  }

  back(): void {
    // this.router.navigate(['../']);
    this.location.back();
  }
}
