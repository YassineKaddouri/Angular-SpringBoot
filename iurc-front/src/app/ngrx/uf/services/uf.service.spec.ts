import { TestBed } from '@angular/core/testing';

import { UfService } from './uf.service';

describe('SiteService', () => {
  let service: UfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
