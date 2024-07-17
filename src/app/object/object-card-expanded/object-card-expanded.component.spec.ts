import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCardExpandedComponent } from './object-card-expanded.component';

describe('ObjectCardExpandedComponent', () => {
  let component: ObjectCardExpandedComponent;
  let fixture: ComponentFixture<ObjectCardExpandedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectCardExpandedComponent]
    });
    fixture = TestBed.createComponent(ObjectCardExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
