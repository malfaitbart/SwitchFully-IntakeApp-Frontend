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
import { JobApplication } from 'src/app/core/jobapplications/classes/jobapplication';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  @Input() candidateId: string;

  candidate$: Observable<Candidate>;

  campaigns: Campaign[];

  newJobApplicationForm = new FormGroup({
    campaignId: new FormControl(''),
    candidateId: new FormControl(''),
    CV: new FormControl(null),
    motivation: new FormControl(null)
  }, { updateOn: 'submit' })

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

  getCandidate(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.candidate$ = this.candidateService.getById(id);
    this.candidateId = id;
  }

  getAllCampaigns() {
    this.campaignservice.getCampaigns()
      .subscribe(campaigns => this.campaigns = campaigns)
  }

  fileChangeCV(files: FileList) {
    if (files && files[0].size > 0) {
      this.newJobApplicationForm.patchValue({
        CV: files[0]
      });
    }
  }
  fileChangeMotivation(files: FileList) {
    if (files && files[0].size > 0) {
      this.newJobApplicationForm.patchValue({
        motivation: files[0]
      });
    }
  }

  prepareData(): FormData{
    const formModel = this.newJobApplicationForm.value;

    let formdata= new FormData();
    formdata.append("candidateid", formModel.candidateId);
    formdata.append("campaignid", formModel.campaignId);
    formdata.append("cv", formModel.cv);
    formdata.append("motivation", formModel.motivation);
    return formdata;
  }

  createJobApplication(): void {

    // this.jobapplicationservice.createJobApplication(jobapplicationCreate)
    //   .subscribe(() => this.router.navigate(['/jobapplications']));
    if (this.newJobApplicationForm.valid) {
      this.jobapplicationservice.createJobApplication(this.prepareData());
  }  }

  goBack(): void {
    this.location.back();
  }

}
