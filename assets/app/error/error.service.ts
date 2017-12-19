import {EventEmitter} from '@angular/core';

import {ErrorModel} from './error.model';

export class ErrorService{
    public errorOccurred = new EventEmitter<ErrorModel>();

    public handleError(obj){
        const error = new ErrorModel(obj.error.title,obj.error.error.message);
        this.errorOccurred.emit(error);
    }
}