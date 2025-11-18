import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cookiecard } from './cookiecard';

describe('Cookiecard', () => {
  let component: Cookiecard;
  let fixture: ComponentFixture<Cookiecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cookiecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cookiecard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
