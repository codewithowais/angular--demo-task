import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = new FormControl('');
  public password = new FormControl('');

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn){
      this.router.navigate(['dashboard']);
    }
  }

  login(): void {
    const payload = {
      username: this.username.value,
      password: this.password.value,
    };

    this.auth.login(payload);
  }

}
