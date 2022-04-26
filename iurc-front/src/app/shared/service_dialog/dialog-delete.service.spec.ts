import { TestBed } from '@angular/core/testing';

import { DialogDeleteService } from './dialog-delete.service';

describe('DialogDeleteService', () => {
  let service: DialogDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
