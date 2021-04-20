import { TestBed } from '@angular/core/testing';

import { ByteBuilderFormService } from './byte-builder-form.service';

describe('ByteBuilderFormService', () => {
  let service: ByteBuilderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ByteBuilderFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
