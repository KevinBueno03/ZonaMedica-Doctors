import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [

  { path: '', redirectTo: 'doctor/login',pathMatch: 'full' },
  { path: 'doctor/login', component: LoginComponent },
  { path: 'doctor/register', component: RegisterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
