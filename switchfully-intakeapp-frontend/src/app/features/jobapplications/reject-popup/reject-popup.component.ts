import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { trigger, style, animate, transition } from '@angular/animations';
import { JobApplication } from 'src/app/core/jobapplications/classes/jobapplication';
import { JobapplicationService } from 'src/app/core/jobapplications/jobapplication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reject-popup',
  templateUrl: './reject-popup.component.html',
  styleUrls: ['./reject-popup.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class RejectPopupComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean; 
  @Input() selectedJobApplication: JobApplication; 
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
  constructor(private jobapplicationservice: JobapplicationService, private location: Location) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  reject(){
    console.log(this.selectedJobApplication.id);
    this.jobapplicationservice.rejectJobApplications(this.selectedJobApplication.id);  
    this.location.back();  
  }
}
