import { TestBed } from '@angular/core/testing';

import { Adduser } from './adduser';

describe('Adduser', () => {
  let service: Adduser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adduser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
