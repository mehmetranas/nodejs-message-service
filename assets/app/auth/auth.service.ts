import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {User} from './user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{

    readonly BASE_URL = 'https://app-message-service.herokuapp.com';

    constructor(private http: HttpClient){}

     public createUser(user: User){
        const body = JSON.stringify(user);
        return this.http.post(this.BASE_URL + '/user/signup', body).map
        ((res: any) => {
            return new User(null,null,null,res.obj.firstName,res.obj.lastName)
        });
    }

    public signin(user: User){
        const body = JSON.stringify(user);
        return this.http.post(this.BASE_URL + '/user/signin', body);
    }

    public logout(){
        localStorage.clear();
    }

    public isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}