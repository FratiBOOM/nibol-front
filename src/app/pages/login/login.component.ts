import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  loginData: LoginDTO = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: res => {
        console.log('Login riuscito', res);
        localStorage.setItem('token', res.token);
      },
      error: err => {
        console.error('Errore login', err);
      }
    });
  }
}
