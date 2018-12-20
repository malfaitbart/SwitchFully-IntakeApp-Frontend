import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/core/campaigns/classes/campaign';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns-overview.component.html',
  styleUrls: ['./campaigns-overview.component.css']
})
export class CampaignsComponent implements OnInit {
  
campaigns$ : Observable<Campaign[]>;
campaignsFromStream$ : Observable<Campaign[]>;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.getAllCampaigns();
    this.seachByElement("");
  }

  getAllCampaigns(){
    this.campaignsFromStream$ = this.campaignService.getCampaigns()
  }

  seachByElement(givenSearchTerm) {
   this.campaigns$ = this.campaignService.searchItemOnGivenElement(givenSearchTerm,this.campaignsFromStream$);
  }
}
