import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SortfilterComponent } from './sortfilter.component';

describe('SortfilterComponent', () => {
  let component: SortfilterComponent;
  let fixture: ComponentFixture<SortfilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SortfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
