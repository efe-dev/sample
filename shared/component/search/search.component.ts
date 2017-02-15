import { Component, ElementRef } from '@angular/core';
import { SearchResult } from '../../../model';
import { SearchService } from '../../../service';
import { RouteService } from '../../../app.routes.service';

@Component({
    selector: 'searchbar',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    private closed: boolean;
    public query: string = '';
    public searchResults: SearchResult[];

    constructor(private searchService: SearchService, private routeService: RouteService) {
        this.searchResults = [];
        this.close();
    }


    filter() {
        if (this.query && this.query.length >= 4) {
            this.show();
            this.searchService.find(this.query).then(results => this.searchResults = results);
        }
    }

    select(result: SearchResult) {
        this.routeService.navigateToHouseDetail(result.HouseId.toString());
        this.close();
    }

    close(): void{
        this.closed = true;
    }

    private show(): void{
        this.closed = false;
    }
}
