import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LogInComponent } from './log-in/log-in.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { HistoryComponent } from './history/history.component';
// import { ReviewsComponent } from './reviews/reviews.component';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileComponent } from './profile/profile.component';
// import { HelpsComponent } from './helps/helps.component';
// import { SubmitRequestComponent } from './submit-request/submit-request.component';
// import { SignupComponent } from './signup/signup.component';
// import { StudyspotViewComponent } from './studyspot-view/studyspot-view.component';
// import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LogInComponent },
  // { path: 'home', component: HomepageComponent },
  // { path: 'favorites', component: FavoritesComponent },
  // { path: 'history', component: HistoryComponent},
  // { path: 'profile', component: ProfileComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'reviews', component: ReviewsComponent},
  // { path: 'help', component: HelpsComponent},
  // { path: 'submitrequest', component: SubmitRequestComponent},
  // { path: 'signup', component: SignupComponent},
  // { path: 'studyspot-view', component: StudyspotViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }