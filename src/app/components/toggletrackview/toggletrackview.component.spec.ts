import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggletrackviewComponent } from './toggletrackview.component';

describe('ToggletrackviewComponent', () => {
  let component: ToggletrackviewComponent;
  let fixture: ComponentFixture<ToggletrackviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggletrackviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggletrackviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
