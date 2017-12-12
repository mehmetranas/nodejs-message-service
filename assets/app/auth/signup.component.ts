import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm,  Validators} from '@angular/forms';

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
        <button class="btn btn-success"  [disabled]="form.invalid">Signup</button>
    `
})

export class SignupComponent implements OnInit{
    private signupForm: FormGroup;

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            mail: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        })
    }

    onSignup(form: NgForm){
    }

}