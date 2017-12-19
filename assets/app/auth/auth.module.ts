import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
import {SignupComponent} from './signup.component';
import {authRouting} from './auth.router';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        SignupComponent
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        authRouting
    ]
})
export class AuthModule{

}