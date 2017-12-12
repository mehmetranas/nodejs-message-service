import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    private loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            mail: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(4)])
        })
    }

    onLogin(){
        console.log("name: " + this.loginForm.value.mail);
    }
}