import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomepageComponent} from '../features/homepage/homepage.component';
import { CampaignsComponent } from '../features/campaigns/campaigns.component';

const routes: Routes=[
  {path: '', component: HomepageComponent},
  {path: "campaigns", component: CampaignsComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule { }
