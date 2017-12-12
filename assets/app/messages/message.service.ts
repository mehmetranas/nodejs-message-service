import {Message} from './message.model';

export class MessageService{
    private messages = [
        new Message("New message about Mongoose stack","Said"),
        new Message("New message about Express stack","Said"),
        new Message("New message about Angular stack","Said")
    ];

    public addMessage(message: Message){
        this.messages.push(message);
        console.log(this.messages);
    }

    public getMessage(){
        return this.messages;
    }

    public deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}