import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportObjectComponent } from './report-object.component';

describe('ReportObjectComponent', () => {
  let component: ReportObjectComponent;
  let fixture: ComponentFixture<ReportObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportObjectComponent]
    });
    fixture = TestBed.createComponent(ReportObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
