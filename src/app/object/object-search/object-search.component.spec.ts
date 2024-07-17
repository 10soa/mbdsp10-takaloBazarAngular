import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSearchComponent } from './object-search.component';

describe('ObjectSearchComponent', () => {
  let component: ObjectSearchComponent;
  let fixture: ComponentFixture<ObjectSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectSearchComponent]
    });
    fixture = TestBed.createComponent(ObjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
