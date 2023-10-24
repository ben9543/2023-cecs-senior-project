import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './history/history.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpsComponent } from './helps/helps.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { SignupComponent } from './signup/signup.component';
import { StudyspotViewComponent } from './studyspot-view/studyspot-view.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckInComponent } from './check-in/check-in.component';
import { RateMeComponent } from './rate-me/rate-me.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
  { path: 'help', component: HelpsComponent, canActivate: [AuthGuard]},
  { path: 'submitrequest', component: SubmitRequestComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'studyspot-view', component: StudyspotViewComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'rate-me', component: RateMeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
