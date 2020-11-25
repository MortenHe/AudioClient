import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayercontrolComponent } from './playercontrol.component';

describe('PlayercontrolComponent', () => {
  let component: PlayercontrolComponent;
  let fixture: ComponentFixture<PlayercontrolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayercontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
