import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../features/homepage/homepage.component';
import { LoginComponent } from '../features/login/login.component';
import { AuthGuard } from '../core/authentication/guard/auth.guard';

import { CampaignsComponent } from '../features/campaigns/campaigns-overview/campaigns-overview.component';
import { CampaignDetailComponent } from '../features/campaigns/campaign-detail/campaign-detail.component';
import { CampaignNewComponent } from '../features/campaigns/campaign-new/campaign-new.component';

import { CandidateOverviewComponent } from '../features/candidates/candidate-overview/candidate-overview.component';
import { CandidateNewComponent } from '../features/candidates/candidate-new/candidate-new.component';
import { CandidateDetailComponent } from '../features/candidates/candidate-detail/candidate-detail.component';


import { JobapplicationOverviewComponent } from '../features/jobapplications/jobapplication-overview/jobapplication-overview.component';
import { JobapplicationDetailComponent } from '../features/jobapplications/jobapplication-detail/jobapplication-detail.component';
import { FileUploadComponent } from '../features/jobapplications/file-upload/file-upload.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: "campaigns", component: CampaignsComponent, canActivate: [AuthGuard] },
  { path: "campaigndetail/:id", component: CampaignDetailComponent, canActivate: [AuthGuard] },
  { path: "campaignnew", component: CampaignNewComponent, canActivate: [AuthGuard] },
  { path: 'candidates', component: CandidateOverviewComponent, canActivate: [AuthGuard] },
  { path: 'candidates/new', component: CandidateNewComponent, canActivate: [AuthGuard] },
  { path: 'candidates/:id', component: CandidateDetailComponent, canActivate: [AuthGuard] },
  { path: 'jobapplications', component: JobapplicationOverviewComponent, canActivate: [AuthGuard] },
  { path: 'jobapplications/:id', component: JobapplicationDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule { }
