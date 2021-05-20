import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectusermodeComponent } from './selectusermode.component';

describe('SelectusermodeComponent', () => {
  let component: SelectusermodeComponent;
  let fixture: ComponentFixture<SelectusermodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectusermodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectusermodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
