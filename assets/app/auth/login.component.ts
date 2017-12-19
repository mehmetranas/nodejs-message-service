import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {User} from './user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector:'app-login',
    template:`
        <form #form="ngForm" [formGroup]="loginForm">
        <div class="form-group">
            <label for="mail">Email</label>
            <input type="email" class="form-control" id="mail" formControlName="mail">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" formControlName="password" class="form-control">
        </div>
        </form>
        <button class="btn btn-primary" [disabled]="form.invalid" (click)="onLogin()">Login</button>
    `
})

export class LoginComponent implements OnInit{

    public loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            mail: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(4)])
        })
    }

    onLogin(){
        const user = new User(this.loginForm.value.password,this.loginForm.value.mail);
        this.authService.signin(user).subscribe(
            (res: any) => {
                this.loginForm.reset();
                localStorage.setItem('token',res.token);
                localStorage.setItem('userId',res.userId);
                this.router.navigate(['messages']);
            },
            (err: HttpErrorResponse) => {
                if(err instanceof Error) console.log('Client-side error');
                else console.log('Server-side error');
                console.log(err);
            }
        );
    }
}