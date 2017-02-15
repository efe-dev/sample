import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import { HttpService } from './utils';
import { User, StreetAddress } from '../model';

@Injectable()
export class UserService {

    private currentUser: string;

    constructor(private auth: AuthService, private httpService: HttpService) {
        this.currentUser = this.auth.getCurrentUser();
    }

    public getStreetAddress(): Promise<StreetAddress> {
        let id = this.auth.getClaims().address;
        if(!id){
            return Promise.reject<StreetAddress>('No streetaddress claim');
        }
        return this.httpService.getFromIdentityApi(`streetaddress/${id}`)
            .then(res => res.json())
            .then(rawObj => {
                let streetAddress = StreetAddress.createFromRequest(rawObj);
                if(!streetAddress){
                    throw new Error('Not a street address');
                }
                return streetAddress;
            });
    }

    public isTenant(): boolean{
        let id = this.auth.getClaims().address;
        return !!id;
    }
}
