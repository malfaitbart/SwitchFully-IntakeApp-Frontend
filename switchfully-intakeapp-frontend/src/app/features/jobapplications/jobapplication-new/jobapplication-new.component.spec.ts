import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapplicationNewComponent } from './jobapplication-new.component';

describe('JobapplicationNewComponent', () => {
  let component: JobapplicationNewComponent;
  let fixture: ComponentFixture<JobapplicationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobapplicationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobapplicationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
