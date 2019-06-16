import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authenticationService: AuthenticationService = this.inj.get(AuthenticationService);
    const token = authenticationService.getToken();
    if (token !== null && token !== undefined && token !== '') {
      request = request.clone({
        setHeaders: {
          'X-Auth-Token': `${authenticationService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
