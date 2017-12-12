export class User{
    constructor(public password:string,
                public email:string,
                public messageIds?: string [],
                public firstName?: string,
                public lastName?: string,){}
}
