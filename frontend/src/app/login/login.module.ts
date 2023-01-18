import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ToastsModule } from '../toasts/toasts.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    ReactiveFormsModule,
    ToastsModule,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
