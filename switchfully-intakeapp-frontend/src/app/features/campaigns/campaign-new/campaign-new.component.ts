import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Campaign } from 'src/app/core/campaigns/classes/campaign';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.css']
})
export class CampaignNewComponent implements OnInit {

  error:any={isError:false,errorMessage:''};

  constructor(private campaignService: CampaignService, private route: ActivatedRoute) { }

  campaignForm = new FormGroup({
    name: new FormControl(),
    client: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  })

  ngOnInit() {
  }

  submitForm(): void {
    this.formValidation()
    if(this.error.isError)
    {return}
    this.campaignService.createCampaign(this.campaignForm.value as Campaign).subscribe();
    this.campaignForm.reset();
  }
  
  
  
  formValidation(){    
    this.error={isError:false,errorMessage:''};
  
    //input
    if( this.campaignForm.controls['name'].value === null || this.campaignForm.controls['name'].value.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`Campaign name is requierd`};
      return;
    } 
      if( this.campaignForm.controls['client'].value === null || this.campaignForm.controls['client'].value.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`Client name is requierd`};
      return;
    } 

    //dateChecks
    if( new Date(this.campaignForm.controls['startDate'].value) < new Date(Date.now()) ){
      this.error={isError:true,errorMessage:`startDate can't be in the past`};
      return;
    }
    if( new Date(this.campaignForm.controls['endDate'].value) == new Date(this.campaignForm.controls['startDate'].value) ){
      this.error={isError:true,errorMessage:`End Date can't be on the same date as the start date`};
      return;
    }   
    if( new Date(this.campaignForm.controls['endDate'].value) < new Date(this.campaignForm.controls['startDate'].value) ){
      this.error={isError:true,errorMessage:`End Date can't before start date`};
      return;
    }  
  }
}
