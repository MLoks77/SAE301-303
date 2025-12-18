import { TestBed } from '@angular/core/testing';

import { ConnexionApi } from './connexion-api';

describe('ConnexionApi', () => {
  let service: ConnexionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
