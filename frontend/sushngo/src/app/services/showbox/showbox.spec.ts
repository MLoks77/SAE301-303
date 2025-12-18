import { TestBed } from '@angular/core/testing';

import { Showbox } from './showbox';

describe('Showbox', () => {
  let service: Showbox;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showbox);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
