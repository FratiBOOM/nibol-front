import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterDTO } from '../../models/register';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordStrengthPercent: number = 0;
  passwordStrengthText: string = '';
  passwordStrengthClass: string = '';
  password: string = '';
  acceptTerms: boolean = false;

  registerData: RegisterDTO = { Email: '', password: '', Nome: '', Cognome: '' };

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) { }

  

onSubmit(): void {
  if (!this.acceptTerms) {
    this.translate.get([
      'REGISTER.TERMS_TITLE',
      'REGISTER.TERMS_TEXT'
    ]).subscribe(t => {
      Swal.fire({
        icon: 'warning',
        title: t['REGISTER.TERMS_TITLE'],
        text: t['REGISTER.TERMS_TEXT']
      });
    });
    return;
  }

  this.authService.register(this.registerData).subscribe({
    next: () => {
      this.translate.get([
        'REGISTER.SUCCESS_TITLE',
        'REGISTER.SUCCESS_TEXT'
      ]).subscribe(t => {
        Swal.fire({
          icon: 'success',
          title: t['REGISTER.SUCCESS_TITLE'],
          text: t['REGISTER.SUCCESS_TEXT'],
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      });
    },
    error: err => {
      this.translate.get([
        'REGISTER.ERROR_TITLE',
        'REGISTER.ERROR_TEXT'
      ]).subscribe(t => {
        Swal.fire({
          icon: 'error',
          title: t['REGISTER.ERROR_TITLE'],
          text: err.error?.message || t['REGISTER.ERROR_TEXT']
        });
      });
    }
  });
}



  checkPasswordStrength(password: string): void {
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    this.passwordStrengthPercent = (strength / 4) * 100;

    if (strength === 0) {
      this.passwordStrengthText = '';
      this.passwordStrengthClass = '';
    } else if (strength <= 1) {
      this.passwordStrengthText = 'too easy my friend';
      this.passwordStrengthClass = 'weak';
    } else if (strength === 2) {
      this.passwordStrengthText = 'getting better';
      this.passwordStrengthClass = 'medium';
    } else {
      this.passwordStrengthText = 'strong password!';
      this.passwordStrengthClass = 'strong';
    }
  }
}
