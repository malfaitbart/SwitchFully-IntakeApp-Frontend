import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RoutingModule } from '../routing/routing.module';
import { HeaderComponent } from './header/header.component';

import { CampaignsComponent } from './campaigns/campaigns.component';

import { LoginComponent } from './login/login.component';
import { CandidateOverviewComponent } from './candidates/candidate-overview/candidate-overview.component';
import { CandidateNewComponent } from './candidates/candidate-new/candidate-new.component';
import { CandidateDetailComponent } from './candidates/candidate-detail/candidate-detail.component';


@NgModule({
  declarations: [
HomepageComponent,
LoginComponent,
CampaignsComponent,
CandidateOverviewComponent,
CandidateNewComponent,
CandidateDetailComponent

  ],
  imports: [
    CoreModule,
    RoutingModule
  ]
})
export class FeaturesModule { }
