import { TestBed } from '@angular/core/testing';

import { BeerChangeService } from './beer-change.service';

describe('BeerChangeService', () => {
  let service: BeerChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
