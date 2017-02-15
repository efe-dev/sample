import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthService } from '../auth';
import { CachingService } from './caching.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService implements OnDestroy {
    constructor(private http: Http, private authService: AuthService, private cachingService: CachingService) { }

    ngOnDestroy() {

    }

    public get(url: string, options?: HttpOptions): Promise<Response> {
        var promise: Promise<Response>;
        if (options && options.CacheEnabled) {
            promise = this.cachingService.get(url);
            if (!promise) {
                promise = this.getFrom(environment.apiBaseUrl, url);
                this.cachingService.set(url, promise);
            }
        }
        else {
            promise = this.getFrom(environment.apiBaseUrl, url);
        }
        return promise;
    }

    public getFromIdentityApi(url: string, options?: HttpOptions): Promise<Response> {
        var promise: Promise<Response>;
        if (options && options.CacheEnabled) {
            promise = this.cachingService.get(url);
            if (!promise) {
                promise = this.getFrom(environment.authConfig.end_point, url);
                this.cachingService.set(url, promise);
            }
        }
        else {
            promise = this.getFrom(environment.authConfig.end_point, url);
        }
        return promise;
    }

    private getFrom(base: string, url: string): Promise<Response> {
        if (!this.authService.isAuthorized) {
            return Promise.reject<Response>("Unauthorized");
        }

        let headers = new Headers({ 'Authorization': `Bearer ${this.authService.getToken()}` });
        let options = new RequestOptions({ headers: headers });
        var separator = "?";
        if (url.indexOf('?') >= 0) {
            separator = "&";
        }
        const fullUrl = `${this.removeTrailingSlash(base)}/api/${url}${separator}_=` + Date.now();
        return this.http.get(fullUrl, options)
            .map((res: Response) => {
                return res;
            })
            .toPromise();
    }

    private removeTrailingSlash(str: string): string {
        return str.replace(/\/$/, "");
    }
}

export class HttpOptions {
    public CacheEnabled: boolean;

    public constructor() { }

    public static CachedRequest(): HttpOptions {
        var cached = new HttpOptions();
        cached.CacheEnabled = true;
        return cached;
    }
}