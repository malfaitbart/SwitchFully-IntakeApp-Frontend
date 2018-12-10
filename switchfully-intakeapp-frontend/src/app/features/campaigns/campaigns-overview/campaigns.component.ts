import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/core/campaigns/campaign';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  
campaigns: Campaign[];
campaigns$ : Observable<Campaign[]>;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.getAllCampaigns();
    console.log(this.campaigns)
  }

  getAllCampaigns(){
    this.campaigns$ = this.campaignService.getCampaigns()
  }

}
