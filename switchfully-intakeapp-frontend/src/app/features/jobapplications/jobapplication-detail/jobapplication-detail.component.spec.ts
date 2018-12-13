import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapplicationDetailComponent } from './jobapplication-detail.component';

describe('JobapplicationDetailComponent', () => {
  let component: JobapplicationDetailComponent;
  let fixture: ComponentFixture<JobapplicationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobapplicationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobapplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
