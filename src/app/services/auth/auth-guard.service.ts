import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      if (this.auth.isLoggedIn){
        observer.next(true);
      } else {
        this.router.navigate(['login']);
        observer.next(false);
      }
    });
  }
}
