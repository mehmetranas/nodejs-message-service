import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {MessageComponent} from './message.component';
import {MessageListComponent} from './message-list.component';
import {MessageInputComponent} from './message-input.component';
import {MessagesComponent} from './messages.component';

@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ]
})
export class MessageModule{

}