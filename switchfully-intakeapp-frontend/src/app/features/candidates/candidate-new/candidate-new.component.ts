import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/core/candidates/classes/candidate';
import { CandidateService } from 'src/app/core/candidates/candidate.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-new',
  templateUrl: './candidate-new.component.html',
  styleUrls: ['./candidate-new.component.css']
})
export class CandidateNewComponent implements OnInit {
  error: any = { isError: false, errorMessage: '' };

  newCandidateForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('', Validators.pattern(/^[0-9]+$/)),
    linkedin: new FormControl(''),
    comment: new FormControl('')
  })

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createCandidate(candidate: Candidate): void {
    this.formValidation(candidate)
    if (this.error.isError) { return }
    this.candidateService.createCandidate(candidate)
      .subscribe(() => this.router.navigate(['/candidates']));

  }



  formValidation(candidate: Candidate) {
    this.error = { isError: false, errorMessage: '' };

    //input
    if (candidate.firstName.length > 100) {
      this.error = { isError: true, errorMessage: `firstname can be max 100 character long` }
      return;
    }
    if (candidate.lastName.length > 100) {
      this.error = { isError: true, errorMessage: `lastname can be max 100 character long` }
      return;
    }
    if (candidate.comment.length > 400) {
      this.error = { isError: true, errorMessage: `firstname can be max 400 character long` }
      return;
    }
    if (candidate.firstName === null || candidate.firstName.match(/^ *$/)) {
      this.error = { isError: true, errorMessage: `firstName is required` };
      return;
    }
    if (candidate.lastName === null || candidate.lastName.match(/^ *$/)) {
      this.error = { isError: true, errorMessage: `lastName is required` };
      return;
    }
    if (candidate.email === null || !candidate.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]*$/)) {
      console.log(candidate.email)
      this.error = { isError: true, errorMessage: `email is required in the folowing format(abcde@fgh.ijk)` };
      return;
    }

  }

}
