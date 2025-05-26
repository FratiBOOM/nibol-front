import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordData = { email: '' };

  constructor(private authService: AuthService) { }


onSubmit(): void {
  this.authService.forgotPassword(this.forgotPasswordData.email).subscribe({
    next: res => {
      alert('If the email exists in our system, you will receive a password reset link.');
    },
    error: err => {
      alert('No email was sent. The service is not implemented or an error occurred.');
    }
  });
}




}
