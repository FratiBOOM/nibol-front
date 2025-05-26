import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent}
];
