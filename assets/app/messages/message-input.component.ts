import {Component, OnInit} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-message-input',
    templateUrl:'./message-input.component.html'
})

export class MessageInputComponent implements OnInit{
    private messageToEdit: Message;

    ngOnInit(): void {
        this.messageService.messegeToEdit.subscribe(
            (message: Message) => {
                this.messageToEdit = message;
            }
        )
    }

    constructor(private messageService: MessageService){}

    onClear(form: NgForm) {
        this.messageToEdit = null;
        form.reset();
    }

    onSave(form: NgForm){
        if(this.messageToEdit){
            this.messageToEdit.content = form.value.content;
            this.messageService.editMessage(this.messageToEdit).subscribe(
                res => console.log(res),
                (err: HttpErrorResponse) => {
                    if (err instanceof Error) console.log('Client-Side Error');
                    else console.log('Server-Side Error');
                    console.log(err);
                }
            );
            this.messageToEdit = null;
          }else {
            const message = new Message(form.value.content, 'Deniz');
            this.messageService.addMessage(message).subscribe(
                res => console.log(res),
                (err: HttpErrorResponse) => {
                    if (err instanceof Error) console.log('Client-Side Error');
                    else console.log('Server-Side Error');
                    console.log(err);
                }
            );
        }
        form.reset();
    }

}