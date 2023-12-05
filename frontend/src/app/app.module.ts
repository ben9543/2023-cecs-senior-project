import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule} from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule }   from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips'
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './log-in/log-in.component';
import { HeaderComponent } from './header/header.component';
import { StudyspotComponent } from './studyspot/studyspot.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileOverlayComponent } from './profile-overlay/profile-overlay.component';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { HelpsComponent } from './helps/helps.component';
import { SignupComponent } from './signup/signup.component';
import { StudyspotViewComponent } from './studyspot-view/studyspot-view.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserratingComponent } from './userrating/userrating.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RateMeComponent } from './rate-me/rate-me.component';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckIndialogComponent } from './check-indialog/check-indialog.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { LandingAgeComponent } from './landing-age/landing-age.component';
import { StudyspotService } from './studyspot.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestedSpotsComponent } from './requested-spots/requested-spots.component';
import { RequestedSpotViewComponent } from './requested-spot-view/requested-spot-view.component';
import { AuthInterceptor } from './auth.interceptor';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    StudyspotComponent,
    HomepageComponent,
    SearchBarComponent,
    ProfileOverlayComponent,
    MenuOverlayComponent,
    HistoryComponent,
    ProfileComponent,
    SettingsComponent,
    ReviewsComponent,
    SubmitRequestComponent,
    HelpsComponent,
    SignupComponent,
    StudyspotViewComponent,
    FavoritesComponent,
    ResetPasswordComponent,
    ConfirmationDialogComponent,
    SearchFilterComponent,
    ChangePasswordComponent,
    UserratingComponent,
    RateMeComponent,
    CheckInComponent,
    CheckIndialogComponent,
    AdminLoginComponent,
    AdminHomepageComponent,
    AdminHeaderComponent,
    LandingAgeComponent,
    RequestedSpotsComponent,
    RequestedSpotViewComponent,
    FooterComponent
  ],
  entryComponents: [ 
    CheckIndialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    HammerModule,
    MatTabsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [StudyspotService, UserService, AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
