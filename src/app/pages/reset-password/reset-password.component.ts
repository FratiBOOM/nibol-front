import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordData = { token: '', newPassword: '', confirmPassword: '' };

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.resetPasswordData.token = token;
    }
  }
  onSubmit(): void {
    if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmPassword) {
    alert("Passwords do not match.");
    return;
    }
     this.authService.resetPassword(this.resetPasswordData.token, this.resetPasswordData.newPassword).subscribe({
    next: res => {
      alert('Password reset successfully.');
      this.router.navigate(['/login']);
    },
    error: err => {
      alert('Error resetting password. Please try again.');
      console.error(err);
    }
  });
  }

}
