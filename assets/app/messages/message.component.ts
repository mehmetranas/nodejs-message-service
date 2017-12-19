import {Component, Input} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent{
    @Input() public message: Message;

    constructor(private messageService: MessageService){}

    private onEdit(message: Message){
        this.messageService.getMessageToEdit(message);
    }

    private onDelete(message: Message){
        this.messageService.deleteMessage(message).subscribe(
            (res) => console.log('Success'),
            (err)=> console.log(err)
        );
    }

    public belongsUser(): Boolean{
        return localStorage.getItem('userId') == this.message.userId;
    }
}