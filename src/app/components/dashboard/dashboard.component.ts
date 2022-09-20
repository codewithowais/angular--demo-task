import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public loggedInUser: IUser = {} as IUser;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.appLoggedInUser.subscribe(
      user => {
        this.loggedInUser = user;
      }
    );
  }

}
