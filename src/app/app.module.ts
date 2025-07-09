import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { AnimalsComponent } from './Dashboard/dashboard/animals/animals.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component'; // ✅ Import this
import { RouterModule } from '@angular/router';
import { OnlyNumberDirective } from './only-number.directive';
import{ApiService} from './api.service'






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    SignUpComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ContactComponent,
    ResetPasswordComponent,
    OnlyNumberDirective,
    AnimalsComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
