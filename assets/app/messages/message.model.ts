export class Message{
    constructor(public content:string,
                public userName: string,
                public userId?:string,
                public messageId?: string) {}
}