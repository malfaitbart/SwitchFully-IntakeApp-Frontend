import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Candidate } from 'src/app/core/candidates/classes/candidate';

@Component({
  selector: 'app-candidate-overview',
  templateUrl: './candidate-overview.component.html',
  styleUrls: ['./candidate-overview.component.css']
})
export class CandidateOverviewComponent implements OnInit {

  candidates: Candidate[];

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.getAllCandidates();
  }

  getAllCandidates(){
    this.candidateService.getCandidates()
      .subscribe(candidates => this.candidates = candidates)
  }

}
