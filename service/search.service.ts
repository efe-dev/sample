import { Injectable } from '@angular/core';
import { HttpService } from './utils';
import { SearchResult } from '../model';

@Injectable()
export class SearchService {
    public constructor(private httpService: HttpService) { }

    public find(text: string): Promise<SearchResult[]> {
        return this.httpService.get(`search?text=${text}&take=5`)
            .then(rawResponse => rawResponse.json())
            .then(rawData => {
                if (!rawData) {
                    throw new Error('Expect raw response content to exist');
                }
                if (!Array.isArray(rawData)) {
                    throw new Error('Expect raw response content to be an array');
                }
                const results: SearchResult[] = [];
                for (let i = 0; i < rawData.length; i++) {
                    results.push(SearchResult.createFromResponse(rawData[i]));
                }
                return results;
            });
    }
}