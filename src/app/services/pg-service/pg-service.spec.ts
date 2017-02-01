/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PgService } from './pg-service';

describe('PgServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PgService]
    });
  });

  it('should ...', inject([PgService], (service: PgService) => {
    expect(service).toBeTruthy();
  }));
});
