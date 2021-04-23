import { TestBed } from '@angular/core/testing';

import { EditByteUserService } from './edit-byte-user.service';

describe('EditByteUserService', () => {
  let service: EditByteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditByteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
