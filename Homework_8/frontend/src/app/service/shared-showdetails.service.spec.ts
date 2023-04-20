import { TestBed } from '@angular/core/testing';

import { SharedShowdetailsService } from './shared-showdetails.service';

describe('SharedShowdetailsService', () => {
  let service: SharedShowdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedShowdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
