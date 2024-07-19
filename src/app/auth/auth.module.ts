import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
