import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  appUsers
} from 'src/app/constants/app-users/app-user.constant';
import { IUser } from 'src/app/interfaces/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;
  public appLoggedInUser: Observable<IUser>;
  private $appLoggedInUser: BehaviorSubject<IUser> = new BehaviorSubject(
    {} as IUser
  );

  constructor(private router: Router) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    this.appLoggedInUser = this.$appLoggedInUser.asObservable();
    if (loggedInUser) {
      this.$appLoggedInUser.next(JSON.parse(loggedInUser));
      this.isLoggedIn = true;
      // this.router.navigate(['dashboard']);
    } else {
      this.logout();
    }
  }

  login(payload: any): void {
    const selectedUser = appUsers.find((user) => {
      return (
        user.username === payload.username && user.password === payload.password
      );
    });
    if (selectedUser) {
      this.$appLoggedInUser.next(selectedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(selectedUser));
      this.isLoggedIn = true;
      this.router.navigate(['dashboard']);
    } else {
      this.logout();
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.$appLoggedInUser.next({} as IUser);
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['**']);
  }
}
