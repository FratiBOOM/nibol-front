import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterDTO } from '../../models/register';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
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

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(): void {
    this.authService.register(this.registerData).subscribe({
      next: res => {
        alert(`Registrazione riuscita! Benvenuto `);
        this.router.navigate(['/login']);
      }
    })

    if (!this.acceptTerms) {
      alert('Devi accettare i termini e condizioni per procedere.');
      return;
    }
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
