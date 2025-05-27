import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, TranslateModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordData = { token: '', newPassword: '', confirmPassword: '' };

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.resetPasswordData.token = token;
    }
  }
  onSubmit(): void {
  if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmPassword) {
    this.translate.get([
      'RESET.MISMATCH_TITLE',
      'RESET.MISMATCH_TEXT'
    ]).subscribe(t => {
      Swal.fire({
        icon: 'warning',
        title: t['RESET.MISMATCH_TITLE'],
        text: t['RESET.MISMATCH_TEXT']
      });
    });
    return;
  }

  this.authService.resetPassword(this.resetPasswordData.token, this.resetPasswordData.newPassword).subscribe({
    next: () => {
      this.translate.get([
        'RESET.SUCCESS_TITLE',
        'RESET.SUCCESS_TEXT'
      ]).subscribe(t => {
        Swal.fire({
          icon: 'success',
          title: t['RESET.SUCCESS_TITLE'],
          text: t['RESET.SUCCESS_TEXT'],
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      });
    },
    error: err => {
      this.translate.get([
        'RESET.ERROR_TITLE',
        'RESET.ERROR_TEXT'
      ]).subscribe(t => {
        Swal.fire({
          icon: 'error',
          title: t['RESET.ERROR_TITLE'],
          text: t['RESET.ERROR_TEXT']
        });
      });
      console.error(err);
    }
  });
}


}
