import { userDetailsResolver } from './core/resolvers/user-details.resolver';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgGridUseComponent } from './pages/ag-grid-use/ag-grid-use.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'agrid',
    component: AgGridUseComponent,
  },
  {
    path: 'parent',
    loadChildren: () =>
      import('../app/pages/learing/learing.module').then(
        (m) => m.LearingModule
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        resolve: { userDetails: userDetailsResolver },
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
