import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private as: AuthService, private router: Router) {}
  login(form: any) {
    let data = form.value;
    this.as
      .login(data.email, data.password)
      .then(() => this.router.navigate(['/']))
      .catch((err) => console.log(err));
  }
}
