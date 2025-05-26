import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { HomeComponent } from './pages/home/home.component';
import { ExploreWorkspacesComponent } from './pages/explore/explore.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about-us/about-us.component';
import { WorkPlacesInsertComponent } from './pages/work-places-insert/work-places-insert.component';
import { WorkplaceDetailsComponent } from './pages/work-place-detail/work-place-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'explore', component: ExploreWorkspacesComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'about-us', component: AboutComponent},
    { path: 'work-insert', component: WorkPlacesInsertComponent},
    { path: 'work-place/:id', component: WorkplaceDetailsComponent}
];
