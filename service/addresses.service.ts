import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { StreetAddress } from '../model';
import { HttpService, HttpOptions } from './utils';

@Injectable()
export class AddressesService {
  public constructor(private httpService: HttpService) { }

  public getById(id: string): Promise<StreetAddress> {
    return this.httpService.getFromIdentityApi(`streetaddress/${id}`, HttpOptions.CachedRequest())
      .then(res => res.json())
      .then(rawObj => {
        let streetAddress = StreetAddress.createFromRequest(rawObj);
        if (!streetAddress) {
          throw new Error('Not a street address');
        }
        return streetAddress;
      });
  }

  public get(countryId: string, postcode: string, houseNumber: number, houseNumberAddition?: string): Promise<StreetAddress> {
    var requestPromise: Promise<Response>;
    if (houseNumberAddition) {
      requestPromise = this.httpService.get(`${countryId}:${postcode}:${houseNumber}:${houseNumberAddition}`, HttpOptions.CachedRequest());
    }
    else {
      requestPromise = this.httpService.get(`${countryId}:${postcode}:${houseNumber}`, HttpOptions.CachedRequest());
    }
    return requestPromise.then(res => res.json())
      .then(rawObj => {
        let streetAddress = StreetAddress.createFromRequest(rawObj);
        if (!streetAddress) {
          throw new Error('Not a street address');
        }
        return streetAddress;
      });
  }
}