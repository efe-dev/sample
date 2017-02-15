import { RouterModule, Routes } from '@angular/router';
import {
    ProjectsComponent,
    ProjectDetailComponent,
    SigninComponent,
    HouseDetailComponent,
    DeviceAnalysisComponent,
    DeviceDetailComponent
} from './component';
import { SearchComponent } from './shared';
import { AuthGuard, SigninGuard } from './guard';

const routes: Routes = [

    { path: 'state', canActivate: [SigninGuard], component: SigninComponent },
    // { path: 'search/:search-terms', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
    { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
    { path: 'houses/:house_id', component: HouseDetailComponent, canActivate: [AuthGuard] },
    { path: 'houses/:house_id/analysis/:device_type/:device_id/:data_unit/:data_section', component: DeviceAnalysisComponent, canActivate: [AuthGuard] },
    { path: 'houses/:house_id/analysis/:data_unit/:data_section', component: DeviceAnalysisComponent, canActivate: [AuthGuard] },
    { path: 'houses/:house_id/details/:device_type/:device_id', component: DeviceDetailComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: '/projects' }

];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });