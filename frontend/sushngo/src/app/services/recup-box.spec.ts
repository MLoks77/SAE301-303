import { TestBed } from '@angular/core/testing';

import { RecupBox } from './recup-box';

describe('RecupBox', () => {
  let service: RecupBox;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupBox);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

//ajouté par Sebastian Chisiu