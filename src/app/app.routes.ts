import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: SignupComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot',
    component: ForgotpasswordComponent,
    canActivate: [authGuard],
  },
];
