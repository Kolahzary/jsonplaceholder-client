import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'primeng/components/common/messageservice';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private translocoService: TranslocoService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type == 0) {
          this.messageService.add({
            severity:'info',
            summary: this.translocoService.translate('logger-request-sent')});
        }
        if (event instanceof HttpResponse) {
          this.messageService.add({
            severity:'info',
            summary: this.translocoService.translate('logger-request-success'),
            detail: event.url});
          }
      }),
      catchError((event: HttpEvent<any>) => {
        if (event instanceof HttpErrorResponse) {
          console.log(['http error response', event]);
          if (event.status === 0) {
            return throwError('Could not connect to server');
          }
          if (event.error === undefined) {
            console.error(['empty response!', event, event.error]);
            return throwError('Empty response');
          }
          if (event.error === null) {
            return throwError(event.statusText);
          }
        }
      }));
  }
}
