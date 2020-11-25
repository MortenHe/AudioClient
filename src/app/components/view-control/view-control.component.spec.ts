import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewControlComponent } from './view-control.component';

describe('ViewControlComponent', () => {
  let component: ViewControlComponent;
  let fixture: ComponentFixture<ViewControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
