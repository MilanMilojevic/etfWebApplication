import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ArchiveComponent } from './archive/archive.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PublicLoginComponent } from './public-login/public-login.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { SessionComponent } from './session/session.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: PublicLoginComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'admin-main-page', component: AdminMainPageComponent},
  {path: 'all-users', component: AllUsersComponent},
  {path: 'session', component: SessionComponent},
  {path: 'registration-requests', component: RegistrationRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
