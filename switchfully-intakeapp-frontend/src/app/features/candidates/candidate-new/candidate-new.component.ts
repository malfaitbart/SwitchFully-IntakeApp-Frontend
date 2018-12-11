import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/core/candidates/classes/candidate';
import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-new',
  templateUrl: './candidate-new.component.html',
  styleUrls: ['./candidate-new.component.css']
})
export class CandidateNewComponent implements OnInit {
  newCandidate = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createCandidate(candidate: Candidate): void {
    this.candidateService.createCandidate(candidate)
      .subscribe(() => this.router.navigate(['/candidates']));
  }

}
