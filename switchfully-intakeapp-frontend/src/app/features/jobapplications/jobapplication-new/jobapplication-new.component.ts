import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobapplicationService } from 'src/app/core/jobapplications/jobapplication.service';
import { Router } from '@angular/router';
import { JobApplication } from 'src/app/core/jobapplications/classes/jobapplication';
import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Candidate } from 'src/app/core/candidates/classes/candidate';
import { Campaign } from 'src/app/core/campaigns/classes/campaign';
import { JobApplicationCreate } from 'src/app/core/jobapplications/classes/jobapplicationCreate';

@Component({
  selector: 'app-jobapplication-new',
  templateUrl: './jobapplication-new.component.html',
  styleUrls: ['./jobapplication-new.component.css']
})
export class JobapplicationNewComponent implements OnInit {

  campaigns: Campaign[];
  candidates: Candidate[];

  newJobApplicationForm= new FormGroup({
    campaignId: new FormControl(''),
    candidateId: new FormControl('')
  })

  constructor(
    private jobapplicationservice: JobapplicationService,
    private campaignservice: CampaignService,
    private candidateservice: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCampaigns();
    this.getAllCandidates();
  }

  createJobApplication(jobapplication: JobApplicationCreate): void {
    this.jobapplicationservice.createJobApplication(jobapplication)
      .subscribe(() => this.router.navigate(['/jobapplications']));
  }

  getAllCandidates(){
    this.candidateservice.getCandidates()
      .subscribe(candidates => this.candidates = candidates)
  }
  getAllCampaigns(){
    this.campaignservice.getCampaigns()
      .subscribe(campaigns => this.campaigns = campaigns)
  }

goback(){}
}
