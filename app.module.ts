import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule, PaginationModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { RouteService } from './app.routes.service';
import { environment } from '../environments/environment';

import { TRANSLATION_PROVIDERS, TRANSLATIONS, TranslationPipe, TranslationService, BreadcrumbService, BreadcrumbFormats, PaginationService } from './shared';

import { ProjectsComponent, ProjectDetailComponent, SigninComponent, HouseDetailComponent, DeviceWidgetComponent, DeviceAnalysisComponent, DeviceDetailComponent, ChartDirective, TimeIntervalToggle } from './component';
import { NavbarComponent, SearchComponent, BreadcrumbComponent, GaugeComponent } from './shared';
import { CachingService, HttpService, UserService, AuthService, ProjectsService, HousesService, MonitoringService, DevicesRepository, SearchService, AddressesService } from './service';
import { AuthGuard, SigninGuard } from './guard';
import { SafePipe } from './directive';

import { MockHttpService } from '../../e2e/services/http.service.mock';
import { MockAuthService } from '../../e2e/services/auth.service.mock';

const authService = environment.testing ? MockAuthService : AuthService;
const httpService = environment.testing ? MockHttpService : HttpService;

@NgModule({
    declarations: [
        AppComponent,
        TranslationPipe,
        ProjectsComponent,
        NavbarComponent,
        SearchComponent,
        ProjectDetailComponent,
        SigninComponent,
        SafePipe,
        HouseDetailComponent,
        BreadcrumbComponent,
        DeviceWidgetComponent,
        DeviceAnalysisComponent,
        ChartDirective,
        DeviceDetailComponent,
        GaugeComponent,
        TimeIntervalToggle
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        appRouting,
        DropdownModule.forRoot(),
        PaginationModule.forRoot()
    ],
    exports: [
        BreadcrumbComponent
    ],
    providers: [
        TranslationService,
        { provide: TRANSLATIONS, useFactory: TRANSLATION_PROVIDERS},
        { provide: HttpService, useClass: httpService },
        RouteService,
        BreadcrumbService,
        AuthGuard,
        SigninGuard,
        { provide: AuthService, useClass: authService },
        CachingService,
        UserService,
        ProjectsService,
        HousesService,
        MonitoringService,
        BreadcrumbFormats,
        PaginationService,
        SearchService,
        DevicesRepository,
        AddressesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
