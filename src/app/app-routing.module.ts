import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { Component,output,EventEmitter } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component';



const routes: Routes = [
  {path:'', component:HomepageComponent},
  { path: 'forgot', component:ForgetpasswordComponent },
  {path: 'SignUp', component:SignUpComponent},
  { path: 'Dashboard', loadChildren: () => import('./Dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path: 'header', component:HeaderComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'contact', component:ContactComponent},
  {path:'reset-password',component:ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
