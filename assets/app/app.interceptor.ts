import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {ErrorService} from './error/error.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private errorService: ErrorService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const messageReq = req.clone({
            setHeaders: {
                'Content-Type':'application/json',
                Authorization: `${localStorage.getItem('token')}`
            }
        });

        return next.handle(messageReq).do(
            (event: HttpEvent<any>) => {
            },
            (err:any) => {
                this.errorService.handleError(err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/auth/login');
                    }
                }
            });
    }
}