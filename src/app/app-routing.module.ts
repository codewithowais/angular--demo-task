import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FamilyComponent } from './components/family/family.component';
import { LoginComponent } from './components/login/login.component';
import { RCAComponent } from './components/rca/rca.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        component: DashboardComponent
      },
      {
        path: 'family',
        canActivate: [AuthGuardService],
        component: FamilyComponent
      },
      {
        path: 'rca',
        canActivate: [AuthGuardService],
        component: RCAComponent
      },
      {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
