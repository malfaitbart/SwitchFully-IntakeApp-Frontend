import { Component, OnInit } from '@angular/core';

import { JobapplicationService } from 'src/app/core/jobapplications/jobapplication.service';

import { JobApplication } from 'src/app/core/jobapplications/classes/jobapplication';
import { JobApplicationOverview } from 'src/app/core/jobapplications/classes/jobapplicationoverview';

@Component({
  selector: 'app-jobapplication-overview',
  templateUrl: './jobapplication-overview.component.html',
  styleUrls: ['./jobapplication-overview.component.css']
})
export class JobapplicationOverviewComponent implements OnInit {

  jobapplications: JobApplicationOverview[];

  constructor(
    private jobapplicationservice: JobapplicationService,
  ) { }

  ngOnInit() {
    this.getAllJobApplications();
  }

  getAllJobApplications() {
    this.jobapplicationservice.getJobApplications()
      .subscribe(jobapplications => this.jobapplications = jobapplications)

  }
}
