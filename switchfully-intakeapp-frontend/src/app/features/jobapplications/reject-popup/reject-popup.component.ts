import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { trigger, style, animate, transition } from '@angular/animations';
import { JobApplication } from 'src/app/core/jobapplications/classes/jobapplication';
import { JobapplicationService } from 'src/app/core/jobapplications/jobapplication.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    
    constructor(private jobapplicationservice: JobapplicationService, private location: Location,private route: ActivatedRoute) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  reject(){  
    const id = this.route.snapshot.paramMap.get('id');

    this.jobapplicationservice.rejectJobApplications(id)
      .subscribe(() =>this.location.back());        
  }
}
