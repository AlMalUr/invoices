import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';


@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      url: req.url.replace('', environment.apiUrl)
    });
    return next.handle(secureReq);
  }
}
