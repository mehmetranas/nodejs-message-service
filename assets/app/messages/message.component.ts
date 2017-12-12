import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from './message.model';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent{
    @Input() private message: Message;
    @Output() private editClicked = new EventEmitter<string>();

    onEdit(){
        this.editClicked.emit('Same value')
    }
}