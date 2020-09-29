import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

// import { AuthenticationService } from './_services';

export const COMPONENTS : any[] = [
    LoginComponent,
    HomeComponent
];

export const MODULES : any[] = [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
];

export const PROVIDERS : any[] = [
    
];