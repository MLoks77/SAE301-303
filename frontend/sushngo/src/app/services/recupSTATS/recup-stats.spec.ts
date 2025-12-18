import { TestBed } from '@angular/core/testing';

import { RecupSTATS } from '../../services/recupSTATS/recup-stats';

describe('RecupSTATS', () => {
  let service: RecupSTATS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupSTATS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
