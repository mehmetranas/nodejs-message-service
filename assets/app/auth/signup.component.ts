import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {User} from './user.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector:'app-signup',
    template:`
    <form #form="ngForm" [formGroup]="signupForm">
    <div class="form-group">
    <label for="firstName">First Name</label>
        <input type="text" id="firstName" formControlName="firstName" class="form-control">
    </div>
    <div class="form-group"><label for="lastName">Last Name</label>
        <input type="text" id="lastName" formControlName="lastName" class="form-control">
    </div>
    <div class="form-group"><label for="mail">Mail</label>
        <input type="email" id="mail" formControlName="mail" class="form-control">
    </div>
    <div class="form-group"><label for="password">Password</label>
        <input type="password" id="password" formControlName="password" class="form-control">
    </div>
    </form>
        <button class="btn btn-success" (click)="onSignup()"  [disabled]="form.invalid">Signup</button>
    `
})

export class SignupComponent implements OnInit{
    public signupForm: FormGroup;

    constructor(private authService: AuthService){}

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            mail: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        })
    }

    onSignup(){
        const user = new User(
            this.signupForm.value.password,
            this.signupForm.value.mail,
            null,
            this.signupForm.value.firstName,
            this.signupForm.value.lastName);

        this.authService.createUser(user).subscribe(
            (user: User) => {
                this.signupForm.reset();
                },
            (err: HttpErrorResponse) => {
                if (err instanceof Error) console.log('Client-Side Error');
                else console.log('Server-Side Error');
                console.log(err);
            });
    }
}