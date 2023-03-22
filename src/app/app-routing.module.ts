import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard, NotAuthorizedGuard } from './guards';
import { ForgotPasswordComponent, HomepageComponent, NotfoundComponent, SigninComponent, SignupComponent, VerifyEmailComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthorizedGuard]
  },
  //
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'sign-in',
    component: SigninComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'verify-email/info',
    component: VerifyEmailComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NotAuthorizedGuard]
  },
  //
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
