import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authGuard],
  },
];
