import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs.component/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Paises'} },
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
      {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
      {path: 'observables', component: RxjsComponent, data: {titulo: 'RxJs observables'} },
      {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del tema'} },
      {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
}
];

export const PAGES_ROUTES  = RouterModule.forChild( pagesRoutes);
