import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultlistComponent } from './resultlist.component';

describe('ResultlistComponent', () => {
  let component: ResultlistComponent;
  let fixture: ComponentFixture<ResultlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
