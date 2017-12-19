import {Component, OnInit} from '@angular/core';
import {ErrorModel} from './error.model';
import {ErrorService} from './error.service';

@Component({
    selector:'app-error',
    templateUrl:'./error.component.html',
    styleUrls:['error.component.css']
})

export class ErrorComponent implements OnInit{
    public error: ErrorModel;
    public display = 'none';

    constructor(private errorService:ErrorService){}

    showDialog(){
        this.display = 'none';
    }

    public onErrorHandled(){
        this.display = 'none';
    }

    ngOnInit(): void {
        this.errorService.errorOccurred.subscribe(
            (error:ErrorModel) => {
                this.display = 'block';
                this.error = error;
                console.log(error);
            }
        )
    }

    public onClose(){
        this.display = 'none';
    }
}