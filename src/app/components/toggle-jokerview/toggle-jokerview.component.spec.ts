import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleJokerviewComponent } from './toggle-jokerview.component';

describe('ToggleJokerviewComponent', () => {
  let component: ToggleJokerviewComponent;
  let fixture: ComponentFixture<ToggleJokerviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleJokerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleJokerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
