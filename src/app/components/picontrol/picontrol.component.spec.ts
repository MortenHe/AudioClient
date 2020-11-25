import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PicontrolComponent } from './picontrol.component';

describe('PicontrolComponent', () => {
  let component: PicontrolComponent;
  let fixture: ComponentFixture<PicontrolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PicontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
