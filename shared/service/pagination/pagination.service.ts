import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class PaginationService {

  getPagination(totalItems: number, currentPage: number = 1, collectionSize: number = 10) {
    let totalPages = Math.ceil(totalItems / collectionSize);

    let firstPage: number;
    let lastPage: number;
    
    if(totalPages >= 1) {
      firstPage = 1;
      lastPage = totalPages;
    } 

    let startIndex = (currentPage - 1) * collectionSize;
    let endIndex = Math.min(startIndex + collectionSize - 1, totalItems - 1);

    let pages = _.range(firstPage, lastPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      collectionSize: collectionSize,
      totalPages: totalPages,
      firstPage: firstPage,
      lastPage: lastPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }
  
}
