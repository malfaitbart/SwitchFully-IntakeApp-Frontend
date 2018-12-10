import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/core/campaigns/campaign';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
campaign: Campaign;
  constructor(private campaignService: CampaignService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSingleCampaign();
  }

  getSingleCampaign(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.campaignService.getSingleCampaign(id)
    .subscribe(campaign => this.campaign = campaign);
  }

}

