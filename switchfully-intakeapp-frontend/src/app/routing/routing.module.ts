import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomepageComponent} from '../features/homepage/homepage.component';
import { CampaignsComponent } from '../features/campaigns/campaigns.component';
import { LoginComponent } from '../features/login/login.component';
import { AuthGuard } from '../core/authentication/guard/auth.guard';
import { CandidateOverviewComponent } from '../features/candidates/candidate-overview/candidate-overview.component';

const routes: Routes=[
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full',canActivate:[AuthGuard]},
  {path: 'home', component: HomepageComponent,canActivate:[AuthGuard]},
  {path: 'campaigns', component: CampaignsComponent},
  {path: 'candidates', component: CandidateOverviewComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule { }
