import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  loginData: LoginDTO = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.authService.syncLoginStatus();
  
  console.log('Is logged in?', this.authService.isLogged);
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: res => {
        console.log('Login successful:', res);
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
