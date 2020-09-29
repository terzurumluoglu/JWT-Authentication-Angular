import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent,LoginComponent } from './_components';

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