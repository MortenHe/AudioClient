import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistgeneratorComponent } from './playlistgenerator.component';

describe('PlaylistgeneratorComponent', () => {
  let component: PlaylistgeneratorComponent;
  let fixture: ComponentFixture<PlaylistgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
