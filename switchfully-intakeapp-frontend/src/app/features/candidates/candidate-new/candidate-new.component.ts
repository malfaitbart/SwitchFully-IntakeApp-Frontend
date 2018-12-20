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
  error:any={isError:false,errorMessage:''};

  newCandidateForm = new FormGroup({
    firstName: new FormControl('', Validators.maxLength(200)),
    lastName: new FormControl('', Validators.maxLength(200)),
    email: new FormControl('', [Validators.maxLength(200), Validators.email]),
    phone: new FormControl('', [Validators.maxLength(200), Validators.pattern("^[0-9]*$")]),
    linkedin: new FormControl('', Validators.maxLength(200)),
    comment: new FormControl('', Validators.maxLength(600))
  })

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createCandidate(candidate: Candidate): void {
    this.formValidation(candidate)
    if(this.error.isError)
    {return}
    this.candidateService.createCandidate(candidate)
      .subscribe(() => this.router.navigate(['/candidates']));

  }



  formValidation(candidate: Candidate){
    this.error={isError:false,errorMessage:''};

    //input
    if( candidate.firstName === null || candidate.firstName.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`firstName is requierd`};
      return;
    }
    if( candidate.lastName === null || candidate.lastName.match(/^ *$/) ){
      this.error={isError:true,errorMessage:`lastName is requierd`};
      return;
    }
    if( candidate.email === null || !candidate.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]*$/)){
      console.log(candidate.email)
      this.error={isError:true,errorMessage:`email is requierd in the folowing format(abcde@fgh.ijk)`};
      return;
    }

  }

}
