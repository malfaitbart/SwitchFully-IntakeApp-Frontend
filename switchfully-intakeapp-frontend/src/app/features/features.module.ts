import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RoutingModule } from '../routing/routing.module';
import { CampaignsComponent } from './campaigns/campaigns-overview/campaigns.component';
import { LoginComponent } from './login/login.component';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';
import { CampaignNewComponent } from './campaigns/campaign-new/campaign-new.component';
import { CandidateOverviewComponent } from './candidates/candidate-overview/candidate-overview.component';
import { CandidateNewComponent } from './candidates/candidate-new/candidate-new.component';
import { CandidateDetailComponent } from './candidates/candidate-detail/candidate-detail.component';


@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    CampaignsComponent,
    CampaignDetailComponent,
    CampaignNewComponent,
    CandidateOverviewComponent,
    CandidateNewComponent,
    CandidateDetailComponent,
  ],
  imports: [
    CoreModule,
    RoutingModule
  ]
})
export class FeaturesModule { }
