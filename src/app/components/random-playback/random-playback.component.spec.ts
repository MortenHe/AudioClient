import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RandomPlaybackComponent } from './random-playback.component';

describe('RandomPlaybackComponent', () => {
  let component: RandomPlaybackComponent;
  let fixture: ComponentFixture<RandomPlaybackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPlaybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPlaybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
