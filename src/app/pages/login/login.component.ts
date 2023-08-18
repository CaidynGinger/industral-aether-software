import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  loginFormGroup = new FormGroup({
    email: new FormControl<any>(''),
    password: new FormControl<any>(''),
  });

  onSubmit() {
    this.authService.login({
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password,
    }).subscribe(
      (data: object) => {
        console.log('Success!', data);
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/']);
      }
    );
    // return false;
  }
}
