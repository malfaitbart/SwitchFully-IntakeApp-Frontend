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

  error:any={ endDateIsError: false, beforeDateIsError : false,  campIsError:false, 
    clientIsError : false, clientErrorMessage:'', campErrorMessage: '',endDateErrorMessage: '', beforeDateErrorMessage: ''};

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
    if(this.error.clientIsError || this.error.campIsError || this.error.endDateIsError || this.error.beforeDateIsError)
    {return}
    this.campaignService.createCampaign(newCampaign)
      .subscribe(() => this.router.navigate(['/campaigns']));   
  }
  
  
  
  formValidation(newCampaign: Campaign){    
    this.error={endDateIsError: false, beforeDateIsError : false, campIsError:false, clientIsError:false, clientErrorMessage:'', campErrorMessage: '',
    endDateErrorMessage: '', beforeDateErrorMessage: '' };
  
    //input
    if (newCampaign.name.length > 100) {
      this.error = { campIsError: true, campErrorMessage: `Campaign name can be max 100 character long` }
      return ;
    }
    if (newCampaign.client.length > 100) {
      this.error = { clientIsError: true, clientErrorMessage: `Client name can be max 100 character long` }
      return;
    }
    if( newCampaign.name === null || newCampaign.name.match(/^ *$/) ){
      this.error={campIsError:true,campErrorMessage:`Campaign name is required`};
      return;
    } 
      if( newCampaign.client === null || newCampaign.client.match(/^ *$/) ){
      this.error={clientIsError:true,clientErrorMessage:`Client name is required`};
      return;
    } 

    //dateChecks
    if( new Date(newCampaign.startDate) < new Date(Date.now()) ){
      this.error={beforeDateIsError:true,beforeDateErrorMessage:`startDate can't be in the past`};
      return;
    }
    if( new Date(newCampaign.endDate) <= new Date(newCampaign.startDate) ){
      this.error={endDateIsError:true,endDateErrorMessage:`End Date can't be before start date or be the same as the startDate`};
      return;
    }  
  }
}
