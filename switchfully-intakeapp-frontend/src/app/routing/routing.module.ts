import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomepageComponent} from '../features/homepage/homepage.component';
import { LoginComponent } from '../features/login/login.component';
import { AuthGuard } from '../core/authentication/guard/auth.guard';
import { CampaignsComponent } from '../features/campaigns/campaigns-overview/campaigns.component';
import { CampaignDetailComponent } from '../features/campaigns/campaign-detail/campaign-detail.component';
import { CampaignNewComponent } from '../features/campaigns/campaign-new/campaign-new.component';
import { CandidateOverviewComponent } from '../features/candidates/candidate-overview/candidate-overview.component';

const routes: Routes=[
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full',canActivate:[AuthGuard]},
  {path: 'home', component: HomepageComponent,canActivate:[AuthGuard]},
  {path: "campaigns", component: CampaignsComponent,canActivate:[AuthGuard]},
  {path: "campaigndetail/:id", component: CampaignDetailComponent, canActivate:[AuthGuard] },
  {path: "campaignnew", component: CampaignNewComponent, canActivate:[AuthGuard] },  
  {path: 'candidates', component: CandidateOverviewComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule { }
