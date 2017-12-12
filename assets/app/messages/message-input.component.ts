import {Component} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl:'./message-input.component.html'
})

export class MessageInputComponent{

    constructor(private messageService: MessageService){}

    onSave(form: NgForm){
        console.log(form)
        var message = new Message(form.value.content,'Deniz');
        this.messageService.addMessage(message);
        form.reset();
    }

}