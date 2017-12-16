import {Component, Input} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent{
    @Input() private message: Message;

    constructor(private messageService: MessageService){}

    onEdit(message: Message){
        this.messageService.getMessageToEdit(message);
    }

    onDelete(message: Message){
        this.messageService.deleteMessage(message).subscribe(
            (res) => console.log(res),
            (err)=> console.log(err)
        );
    }
}