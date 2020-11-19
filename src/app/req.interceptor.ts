import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;

  constructor(){
    this.urlsToNotUse= [
      '/login'
    ];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isValidRequestForInterceptor(request.url)) {
      let modifiedRequest = request.clone({
        setHeaders: {
          token:localStorage.getItem('token')
        }
      });

      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = '/api';
    
    let position = requestUrl.indexOf(positionIndicator);
    console.log(requestUrl,position)
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      console.log(destination)
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}