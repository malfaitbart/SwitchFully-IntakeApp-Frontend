import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Campaign } from 'src/app/core/campaigns/campaign';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.css']
})
export class CampaignNewComponent implements OnInit {




campaign = Campaign;

constructor(private campaignService: CampaignService, private route: ActivatedRoute) { }

campaignForm = new FormGroup({
  name: new FormControl(),
  client: new FormControl(),
  startDate: new FormControl(),
  endDate: new FormControl()
})

ngOnInit() {
}

createCustomer(): void {
  this.campaignService.createCampaign(this.campaignForm.value)
    .subscribe();
}

}
