import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MixComponent } from './mix.component';

describe('MixComponent', () => {
  let component: MixComponent;
  let fixture: ComponentFixture<MixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
