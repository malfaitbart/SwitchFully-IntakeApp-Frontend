import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  newJobApplicationForm = new FormGroup({
    campaignId: new FormControl('',[Validators.required]) ,
    candidateId: new FormControl(''),
    cv: new FormControl(null),
    motivation: new FormControl(null)
  })

  constructor(
    private candidateService: CandidateService,
    private jobapplicationservice: JobapplicationService,
    private campaignservice: CampaignService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private http: HttpClient
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

  create(jobapplicationcreate: JobApplicationCreate, cv, motivation) {
    // forkJoin(this.upload(cv), this.upload(motivation))
    this.getDataFromTwoResources(cv, motivation)
      .subscribe(result => {
        const jobAppToCreate = {
          'campaignId': jobapplicationcreate.campaignId,
          'candidateId': jobapplicationcreate.candidateId,
          'cvId': result[0],
          'motivationId': result[1]
        };
        console.log(`We're in`);
        console.log(result);
        this.jobapplicationservice.createJobApplication(jobAppToCreate)
          .subscribe(result => console.log(result));
      });
  }

  getDataFromTwoResources(cv, motivation): Observable<any[]> {
    let url1 = this.upload(cv);
    let url2 = this.upload(motivation);
    return forkJoin([url1, url2]);
  }

  upload(files): Observable<any> {
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }

    return this.http.post('http://localhost:59089/api/Files', formData, { responseType: 'text' });
  }

  createJobApplication(jobapplication: JobApplicationCreate): void {
    this.jobapplicationservice.createJobApplication(jobapplication)
      .subscribe( jobapp => this.router.navigate([`/jobapplications/${jobapp.id}`]));
  }

  goBack(): void {
    this.router.navigate(['/candidates'])
  }

}
