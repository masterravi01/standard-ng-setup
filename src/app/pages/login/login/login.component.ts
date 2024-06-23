import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginInForm = new FormGroup({
    email: new FormControl<string>('khunt1@gmail.com', [Validators.required]),
    password: new FormControl<string>('hiii', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  async logIn() {
    if (this.loginInForm.valid) {
      try {
        await this.authService.login(this.loginInForm.value);
        console.log('Login successful');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
}
