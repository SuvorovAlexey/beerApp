import { TestBed } from '@angular/core/testing';

import { ChangeWeightService } from './change-weight.service';

describe('ChangeWeightService', () => {
  let service: ChangeWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
