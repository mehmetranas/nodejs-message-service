import {Message} from './message.model';
import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {ErrorService} from '../error/error.service';

@Injectable()
export class MessageService{

    public messages: Message[];
    public messegeToEdit = new EventEmitter<Message>();
    readonly BASE_URL = 'http://localhost:2704';

    constructor(private http: HttpClient, private errorService: ErrorService){}

    public addMessage(message: Message){
        const body = JSON.stringify(message);
       return this.http.post(this.BASE_URL + '/message', body).map(
           (res: any) => {
                const message = new Message(
                    res.obj.content,
                    res.obj.user.firstName,
                    res.obj.user._id,
                    res.obj._id);
               this.messages.unshift(message);
               return message
           }
       )
    }

    public getMessages(){
        return this.http.get(this.BASE_URL + '/message').map((res: any) => {
            const messages = res.obj;
            let transformedMessages: Message[] = [];
            for (let message of messages){
                transformedMessages.push(
                    new Message(
                        message.content,
                        message.user.firstName,
                        message.user._id,
                        message._id));
            }
            this.messages = transformedMessages;
            return transformedMessages;
        } );
    }

    public getMessageToEdit(message: Message){
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