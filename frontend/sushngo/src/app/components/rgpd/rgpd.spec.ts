import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RGPD } from './rgpd';

describe('RGPD', () => {
  let component: RGPD;
  let fixture: ComponentFixture<RGPD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RGPD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RGPD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
