import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from 'src/app/core/jobapplications/classes/Screening';
import { ScreeningService } from 'src/app/core/jobapplications/screening.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, subscribeOn, filter } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { NewScreening } from 'src/app/core/jobapplications/classes/newScreening';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {

  selectedJopAppId: string = this.route.snapshot.paramMap.get('id');
  givenScreenings: Screening[];
  lastScreening: Screening = new Screening();

  commentForm = new FormGroup({
    comment: new FormControl()
  });

  constructor(private screeningService: ScreeningService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllScreening();
  }


  getAllScreening(): void {
    this.commentForm.reset();
    this.screeningService.getAllScreeningsings(this.selectedJopAppId).subscribe(screeningArray => {
      this.givenScreenings = screeningArray;
      this.lastScreening = screeningArray[screeningArray.length - 1]
    })
  }
  submitComment(input: NewScreening): void {
    this.screeningService.submitComment(this.selectedJopAppId, input)
      .subscribe(() => window.location.reload());
  }



  toggleCommentField(input: string) {
    let element = document.getElementById(input);

    if (element.classList.contains('boxScreening-active')) {
      element.classList.remove('boxScreening-active')
      element.classList.add('boxScreening')
    }
    else {
      element.classList.remove('boxScreening')
      element.classList.add('boxScreening-active')
    }
  }

}
