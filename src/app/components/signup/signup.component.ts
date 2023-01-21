import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  ngOnInit(): void {}
  constructor(
    private as: AuthService,
    private us: UserService,
    private router: Router
  ) {}
  signUp(form: any) {
    let data: User = form.value;
    this.as
      .signup(data.email, data.password)
      .then((result) => {
        this.errorMessage = '';
        this.us
          .addNewUser(result.user?.uid, data.name, data.adress)
          .then(() => {
            this.router.navigate(['/']);
          });
      })
      .catch((err) => {
        this.errorMessage = err.message;
      });
  }
}
