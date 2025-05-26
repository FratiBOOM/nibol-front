import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  loginData: LoginDTO = { email: '', password: '' };
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: res => {
        console.log('Login riuscito', res);
        localStorage.setItem('token', res.token);
        this.isLoggedIn = true;
      },
      error: err => {
        console.error('Errore login', err);
      }
    });
  }
}
