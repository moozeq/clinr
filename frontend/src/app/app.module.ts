import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';
import { ToastsModule } from "./toasts/toasts.module";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        AuthModule,
        UsersModule,
        LoginModule,
        RegisterModule,
        HomeModule,
        ConfigModule,
        ToastsModule,
        AppRoutingModule,
    ]
})
export class AppModule { }
