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
  error: any = {
    firstNameIsError: false, lastNameIsError: false, commentIsError: false, phoneIsError: false, linkedInIsError: false,
    emailIsError: false, firsNameErrorMessage: '', lastNameErrorMessage: '',
    commentErrorMessage: '', emailErrorMessage: '', phoneErrorMessage: '', linkedInErrorMessage: ''
  };

  newCandidateForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    linkedIn: new FormControl(''),
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
    if (this.error.firstNameIsError || this.error.lastNameIsError ||
      this.error.commentIsError || this.error.emailIsError || this.error.phoneIsError || this.error.linkedInIsError) { return }
    this.candidateService.createCandidate(candidate)
      .subscribe(() => this.router.navigate(['/candidates']));

  }



  formValidation(candidate: Candidate) {
    this.error = {
      firstNameIsError: false, lastNameIsError: false, commentIsError: false, phoneIsError: false, linkedInIsError: false,
      emailIsError: false, firsNameErrorMessage: '', lastNameErrorMessage: '',
      commentErrorMessage: '', emailErrorMessage: '', phoneErrorMessage: '', linkedInErrorMessage: ''
    };

    //input
    if (candidate.firstName.length > 100) {
      this.error = { firstNameIsError: true, firsNameErrorMessage: `firstname can be max 100 character long` }
      return;
    }
    if (candidate.lastName.length > 100) {
      this.error = { lastNameIsError: true, lastNameErrorMessage: `lastname can be max 100 character long` }
      return;
    }
    if (candidate.comment.length > 400) {
      this.error = { commentIsError: true, commentErrorMessage: `firstname can be max 400 character long` }
      return;
    }
    if (candidate.firstName === null || candidate.firstName.match(/^ *$/)) {
      this.error = { firstNameIsError: true, firsNameErrorMessage: `firstName is required` };
      return;
    }
    if (candidate.lastName === null || candidate.lastName.match(/^ *$/)) {
      this.error = { lastNameIsError: true, lastNameErrorMessage: `lastName is required` };
      return;
    }
    if (candidate.email === null || candidate.email.match(/^ *$/)) {
      this.error = { emailIsError: true, emailErrorMessage: `email is required` };
      return;
    }
    if (candidate.email === null || !candidate.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]*$/)) {
      console.log(candidate.email)
      this.error = { emailIsError: true, emailErrorMessage: `email is required in the folowing format(abc@abc.com)` };
      return;
    }
    if (candidate.phone === null || !candidate.phone.match(/^[0-9+]*$/)) {
      console.log(candidate.phone)
      this.error = { phoneIsError: true, phoneErrorMessage: `only numbers and + is allowed` };
      return;
    }    
    if (candidate.linkedIn === null || !candidate.linkedIn.match(/^(www)+\.[a-zA-Z0-9]+\.[a-z.]*$/)) {
      console.log(candidate.linkedIn)
      this.error = { linkedInIsError: true, linkedInErrorMessage: `use www to form a correct URL (www.abcd.com)` };
      return;

    }

  }
}
