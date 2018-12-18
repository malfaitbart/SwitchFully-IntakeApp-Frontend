import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

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
    campaignId: new FormControl(''),
    candidateId: new FormControl(''),
    cv: new FormControl(null),
    motivation: new FormControl(null)
  }, { updateOn: 'submit' })

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

  upload(files) {
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }

    const uploadReq = new HttpRequest('POST', `http://localhost:59089/api/Files`, formData, {
      responseType: 'text'
    });

    this.http.request(uploadReq)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        console.log(Math.round(100 * event.loaded / event.total));
      else if (event.type === HttpEventType.Response)
        console.log(event.body.toString());
    });
  }
  public requestDataFromMultipleSources(cv, motivation): Observable<any[]> {
    let response1 = this.upload(cv);
    let response2 = this.upload(motivation);
    return forkJoin([response1, response2]);
  }
  createJobApplication(
    jobapplicationcreate: JobApplicationCreate,
    cvInput,
    motivationInput) {

    this.requestDataFromMultipleSources(cvInput, motivationInput)
      .subscribe(responseList => {
        console.log('cv: ' + responseList[0]);
        console.log('moti: ' + responseList[1]);
      });

    // const toUpload: JobApplicationCreate = {
    //   ...jobapplicationcreate,
    //   cv: cvfile,
    //   motivation: motifile
    // }
    // console.log(toUpload);


    // this.jobapplicationservice.createJobApplication(toUpload)
    //   .subscribe(() => this.router.navigate(['/jobapplications']));

  }

  goBack(): void {
    this.location.back();
  }

}
