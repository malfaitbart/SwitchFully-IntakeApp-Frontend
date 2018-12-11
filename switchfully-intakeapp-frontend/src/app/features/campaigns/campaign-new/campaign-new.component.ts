import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Campaign } from 'src/app/core/campaigns/classes/campaign';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.css']
})
export class CampaignNewComponent implements OnInit {

  error:any={isError:false,errorMessage:''};

  constructor(private campaignService: CampaignService, private router: Router) { }

  newCampaignForm = new FormGroup({
    name: new FormControl(),
    client: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  })

  ngOnInit() {
  }

  createCampaign(newCampaign: Campaign): void {
    this.formValidation(newCampaign)
    if(this.error.isError)
    {return}
    this.campaignService.createCampaign(newCampaign)
      .subscribe(() => this.router.navigate(['/campaigns']));   
  }
  
  
  
  formValidation(newCampaign: Campaign){    
    this.error={isError:false,errorMessage:''};
  
    //input
    if( newCampaign.name === null || newCampaign.name.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`Campaign name is requierd`};
      return;
    } 
      if( newCampaign.client === null || newCampaign.client.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`Client name is requierd`};
      return;
    } 

    //dateChecks
    if( new Date(newCampaign.startDate) < new Date(Date.now()) ){
      this.error={isError:true,errorMessage:`startDate can't be in the past`};
      return;
    }
    if( new Date(newCampaign.endDate) == new Date(newCampaign.startDate) ){
      this.error={isError:true,errorMessage:`End Date can't be on the same date as the start date`};
      return;
    }   
    if( new Date(newCampaign.endDate) < new Date(newCampaign.startDate) ){
      this.error={isError:true,errorMessage:`End Date can't before start date`};
      return;
    }  
  }
}
