import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordData = { email: '' };

  constructor(private authService: AuthService,private translate: TranslateService) { }


 onSubmit(): void {
  this.authService.forgotPassword(this.forgotPasswordData.email).subscribe({
    next: () => {
      this.translate.get([
        'FORGOT.SUCCESS_TITLE',
        'FORGOT.SUCCESS_TEXT'
      ]).subscribe(translations => {
        Swal.fire({
          icon: 'success',
          title: translations['FORGOT.SUCCESS_TITLE'],
          text: translations['FORGOT.SUCCESS_TEXT'],
          confirmButtonColor: '#3085d6'
        });
      });
    },
    error: () => {
      this.translate.get([
        'FORGOT.ERROR_TITLE',
        'FORGOT.ERROR_TEXT'
      ]).subscribe(translations => {
        Swal.fire({
          icon: 'error',
          title: translations['FORGOT.ERROR_TITLE'],
          text: translations['FORGOT.ERROR_TEXT']
        });
      });
    }
  });
}

}
