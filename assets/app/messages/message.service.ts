import {Message} from './message.model';
import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class MessageService{

    public messages: Message[];
    public messegeToEdit = new EventEmitter<Message>();
    readonly BASE_URL = 'https://app-message-service.herokuapp.com/';

    constructor(private http: HttpClient){}

    public addMessage(message: Message){
        const body = JSON.stringify(message);
       return this.http.post(this.BASE_URL + '/message', body).map(
           (res: Response) => {
                const message = new Message(res.obj.content,'Custom',null,res.obj._id);
                this.messages.unshift(message);
           }
       );
    }

    public getMessages(){
        return this.http.get(this.BASE_URL + '/message').map((res: Response) => {
            const messages = res.messages;
            let transformedMessages: Message[] = [];
            for (let message of messages){
                transformedMessages.push(new Message(message.content,'Deniz',null, message._id));
            }
            this.messages = transformedMessages;
            return transformedMessages;
        } );
    }

    public getMessageToEdit(message: Message){
        console.log(`message in service = ${message.content}`);
        this.messegeToEdit.emit(message);
    }

    public editMessage(message: Message){
        return this.http.put(this.BASE_URL + '/message/' + message.messageId, message);
    }

    public deleteMessage(message: Message){
        return this.http.delete(this.BASE_URL + '/message/' + message.messageId).map(
            (res: Response) => {
                this.messages.splice(this.messages.indexOf(message),1);
            }
        )
    }
}