import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './log-in/log-in.component';
import { StudyspotsComponent } from './studyspots/studyspots.component';
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
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    StudyspotsComponent,
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
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
