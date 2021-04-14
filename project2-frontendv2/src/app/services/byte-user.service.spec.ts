import { TestBed } from '@angular/core/testing';

import { ByteUserService } from './byte-user.service';

describe('ByteUserService', () => {
  let service: ByteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ByteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
