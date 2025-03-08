import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/signup/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'profile', component: ProfileComponent },
    // { path: '**', redirectTo: '', pathMatch: 'full' }
];
