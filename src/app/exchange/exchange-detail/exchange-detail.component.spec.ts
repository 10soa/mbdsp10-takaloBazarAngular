import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDetailComponent } from './exchange-detail.component';

describe('ExchangeDetailComponent', () => {
  let component: ExchangeDetailComponent;
  let fixture: ComponentFixture<ExchangeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeDetailComponent]
    });
    fixture = TestBed.createComponent(ExchangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
