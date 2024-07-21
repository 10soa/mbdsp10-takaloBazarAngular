import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAccountComponent } from './other-account.component';

describe('OtherAccountComponent', () => {
  let component: OtherAccountComponent;
  let fixture: ComponentFixture<OtherAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherAccountComponent]
    });
    fixture = TestBed.createComponent(OtherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
