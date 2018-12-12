import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapplicationOverviewComponent } from './jobapplication-overview.component';

describe('JobapplicationOverviewComponent', () => {
  let component: JobapplicationOverviewComponent;
  let fixture: ComponentFixture<JobapplicationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobapplicationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobapplicationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
