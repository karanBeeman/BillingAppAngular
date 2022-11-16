import { TestBed } from '@angular/core/testing';

import { InoviceBillService } from './inovice-bill.service';

describe('InoviceBillService', () => {
  let service: InoviceBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InoviceBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
