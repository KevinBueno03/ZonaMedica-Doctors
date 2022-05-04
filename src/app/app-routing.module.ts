import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorSegurityRouter } from 'src/app/Seguridad/doctorSeguridad.router';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadCurriculumComponent } from './components/upload-curriculum/upload-curriculum.component';
import { UploadProfilePictureComponent } from './components/upload-profile-picture/upload-profile-picture.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [

  { path: '', redirectTo: 'doctor/login',pathMatch: 'full' },
  { path: 'doctor/login', component: LoginComponent, canActivate: [DoctorSegurityRouter] },
  { path: 'doctor/register', component: RegisterComponent , canActivate: [DoctorSegurityRouter]},
  { path: 'doctor/calendar', component: CalendarComponent, canActivate: [DoctorSegurityRouter] },
  { path: 'doctor/dashboard', component: DashboardComponent,  canActivate: [DoctorSegurityRouter] },
  { path: 'doctor/upload-curriculum', component: UploadCurriculumComponent, canActivate: [DoctorSegurityRouter] },
  { path: 'doctor/upload-profile-picture', component: UploadProfilePictureComponent, canActivate: [DoctorSegurityRouter] },
  { path: 'doctor/profile', component: ProfileComponent , canActivate: [DoctorSegurityRouter]},
  { path: 'doctor/edit-profile', component: EditProfileComponent, canActivate: [DoctorSegurityRouter] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
