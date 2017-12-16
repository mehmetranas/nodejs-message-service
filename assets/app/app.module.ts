import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {MessageComponent} from './messages/message.component';
import {MessageListComponent} from './messages/message-list.component';
import {MessageInputComponent} from './messages/message-input.component';
import {MessageService} from './messages/message.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesComponent} from './messages/messages.component';
import {HeaderComponent} from './header.component';
import {AuthComponent} from './auth/auth.component';
import {routing} from './app.router';
import {LoginComponent} from './auth/login.component';
import {LogoutComponent} from './auth/logout.component';
import {SignupComponent} from './auth/signup.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './app.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        HeaderComponent,
        AuthComponent,
        LoginComponent,
        LogoutComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule],
    bootstrap: [AppComponent],
    providers: [
        MessageService,
        {   provide:HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi:true
        }]
})
export class AppModule {

}