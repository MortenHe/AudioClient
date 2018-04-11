import { TestBed, inject } from '@angular/core/testing';

import { PicontrolService } from './picontrol.service';

describe('PicontrolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PicontrolService]
    });
  });

  it('should be created', inject([PicontrolService], (service: PicontrolService) => {
    expect(service).toBeTruthy();
  }));
});
