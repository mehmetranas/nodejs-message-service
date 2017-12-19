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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './app.interceptor';
import {AuthService} from './auth/auth.service';
import {ErrorComponent} from './error/error.component';
import {ErrorService} from './error/error.service';
import {AccordionModule, DialogModule, MenuItem} from 'primeng/primeng';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MessageModule} from './messages/message.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        routing,
        HttpClientModule,
        MessageModule
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthService,
        MessageService,
        ErrorService,
        {   provide:HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi:true
        }
        ]
})
export class AppModule {

}