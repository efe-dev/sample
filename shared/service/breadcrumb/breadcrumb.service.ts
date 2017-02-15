import { Injectable, EventEmitter } from '@angular/core';
import { BreadCrumbModel } from './breadcrumb.model';
import * as _ from 'lodash';

@Injectable() 
export class BreadcrumbService {

    public constructor(){}

    public changeBreadcrumb: EventEmitter<BreadCrumbModel> = new EventEmitter<BreadCrumbModel>();

    public setBreadCrumb(newBreadCrumb: { [id: string]: string }) {
        this.changeBreadcrumb.emit(new BreadCrumbModel(newBreadCrumb));
    }
}
