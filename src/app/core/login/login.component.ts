import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class LoginComponent {
  loginData: LoginDTO = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) { }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.translate.get(['LOGIN.SUCCESS_TITLE', 'LOGIN.SUCCESS_TEXT']).subscribe(translations => {
          Swal.fire({
            icon: 'success',
            title: translations['LOGIN.SUCCESS_TITLE'],
            text: translations['LOGIN.SUCCESS_TEXT'],
            confirmButtonColor: '#3085d6',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/']);
        });
      },
      error: () => {
        this.translate.get(['LOGIN.ERROR_TITLE', 'LOGIN.ERROR_TEXT']).subscribe(translations => {
          Swal.fire({
            icon: 'error',
            title: translations['LOGIN.ERROR_TITLE'],
            text: translations['LOGIN.ERROR_TEXT'],
            confirmButtonColor: '#d33'
          });
        });
      }
    });
  }
}
