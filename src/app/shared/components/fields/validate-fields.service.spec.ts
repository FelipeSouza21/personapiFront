import { TestBed } from '@angular/core/testing';

import { ValidateFieldsService } from './validate-fields.service';

describe('ValidateFieldsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateFieldsService = TestBed.get(ValidateFieldsService);
    expect(service).toBeTruthy();
  });
});
