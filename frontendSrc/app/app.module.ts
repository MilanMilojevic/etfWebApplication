import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLoginComponent } from './public-login/public-login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MenuComponent } from './menu/menu.component';
import { ArchiveComponent } from './archive/archive.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AllUsersComponent } from './all-users/all-users.component';
import { SessionComponent } from './session/session.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';







@NgModule({
  declarations: [
    AppComponent,
    PublicLoginComponent,
    MainPageComponent,
    MenuComponent,
    ArchiveComponent,
    UserProfileComponent,
    AdminMainPageComponent,
    AllUsersComponent,
    SessionComponent,
    RegistrationRequestsComponent
    ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
