import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenStorageService } from "./token-storage/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authRequest = req;

        const token = this.token.getToken();

        if (token != null) {
            authRequest = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + token)
            });
        }

        return next.handle(authRequest);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];