import { TestBed } from '@angular/core/testing';

import { ContractserviceService } from './contractservice.service';

describe('ContractserviceService', () => {
  let service: ContractserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
