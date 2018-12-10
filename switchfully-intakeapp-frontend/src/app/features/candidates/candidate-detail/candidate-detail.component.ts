import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Candidate } from 'src/app/core/candidates/candidate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  candidate$: Observable<Candidate>;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCandidate();
  }

  getCandidate(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.candidate$ = this.candidateService.getById(id);
    console.log(this.candidate$);
  }
  goBack(): void {
    this.location.back();
  }

}
