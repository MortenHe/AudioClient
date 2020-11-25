import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchfilterComponent } from './searchfilter.component';

describe('SearchfilterComponent', () => {
  let component: SearchfilterComponent;
  let fixture: ComponentFixture<SearchfilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
