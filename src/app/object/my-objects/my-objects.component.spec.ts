import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObjectsComponent } from './my-objects.component';

describe('MyObjectsComponent', () => {
  let component: MyObjectsComponent;
  let fixture: ComponentFixture<MyObjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyObjectsComponent]
    });
    fixture = TestBed.createComponent(MyObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
