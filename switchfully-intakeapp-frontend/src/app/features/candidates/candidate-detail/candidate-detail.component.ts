import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Candidate } from 'src/app/core/candidates/classes/candidate';

import { CampaignService } from 'src/app/core/campaigns/campaign.service';
import { Campaign } from 'src/app/core/campaigns/classes/campaign';

import { JobapplicationService } from 'src/app/core/jobapplications/jobapplication.service';
import { JobApplicationCreate } from 'src/app/core/jobapplications/classes/jobapplicationCreate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  @Input() candidateId: string;

  candidate$: Observable<Candidate>;

  campaigns: Campaign[];

  newJobApplicationForm= new FormGroup({
    campaignId: new FormControl(''),
    candidateId: new FormControl('')
  })

  constructor(
    private candidateService: CandidateService,
    private jobapplicationservice: JobapplicationService,
    private campaignservice: CampaignService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router

  ) { }

  ngOnInit() {
    this.getCandidate();
    this.getAllCampaigns();
  }

  getCandidate(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.candidate$ = this.candidateService.getById(id);   
    this.candidateId = id;
  }

  getAllCampaigns(){
    this.campaignservice.getCampaigns()
      .subscribe(campaigns => this.campaigns = campaigns)
  }
  createJobApplication(jobapplication: JobApplicationCreate): void {
    console.log(this.newJobApplicationForm.value);
    console.log(jobapplication);
    console.log('campaignId: ' + jobapplication.campaignId);
    console.log('candidateId: ' + jobapplication.candidateId);

    this.jobapplicationservice.createJobApplication(jobapplication)
      .subscribe(() => this.router.navigate(['/jobapplications']));
  }

  goBack(): void {
    this.router.navigate(['/candidates'])
  }

}
