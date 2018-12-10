import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateNewComponent } from './candidate-new.component';

describe('CandidateNewComponent', () => {
  let component: CandidateNewComponent;
  let fixture: ComponentFixture<CandidateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
